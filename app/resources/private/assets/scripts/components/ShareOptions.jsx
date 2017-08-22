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
    <form className="note-options-share" onSubmit={submitHandler}>
      {
        props.value.isShared &&
          <div className="note-options-share__content">
            <em className="note-options-share__link">Sharable link:
              <a href={props.url}>{props.url}</a>
            </em>
            <DateTimePicker
              onChange={datetimeHandler}
              value={props.value.expiration}
            />
          </div>
      }
      <div className="note-options-share__input-group">
        <div>
          <input
            className="note-options-share__checkbox-input"
            id="isShared"
            type="checkbox"
            checked={props.value.isShared}
            onChange={isSharedHandler}
          />
          <label
            className="note-options-share__checkbox-label"
            htmlFor="isShared"
          >
            Shared
          </label>
        </div>
        <button
          className="note-options-share__button"
          type="submit"
        >
          Save
        </button>
      </div>
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
