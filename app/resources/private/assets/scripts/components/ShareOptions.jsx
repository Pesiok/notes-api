import React from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from './DateTimePicker';

const ShareOptions = (props) => {
  // event handlers
  const isSharedHandler = (event) => {
    const isShared = event.target.checked;
    let expiration = props.value.expiration;
    if (!isShared) expiration = null;

    props.onChange({ isShared, expiration }, 'share');
  };
  const datetimeHandler = (dates) => {
    const expiration = Date.parse(dates[0]) || null;
    const isShared = props.value.isShared;

    props.onChange({ isShared, expiration }, 'share');
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onSave();
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="isShared"> Shared
        <input
          id="isShared"
          type="checkbox"
          checked={props.value.isShared}
          onChange={isSharedHandler}
        />
      </label>
      {
        props.value.isShared &&
          <div>
            <em><a href={props.url}>{props.url}</a></em>
            <DateTimePicker
              onChange={datetimeHandler}
              value={props.value.expiration}
            />
          </div>
      }
      <button type="submit">Save</button>
    </form>
  );
};

ShareOptions.propTypes = {
  value: PropTypes.shape({
    isShared: PropTypes.bool.isRequired,
    expiration: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  url: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ShareOptions;
