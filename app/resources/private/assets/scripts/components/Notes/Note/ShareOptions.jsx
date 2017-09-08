import React from 'react';
import PropTypes from 'prop-types';

import ShareDetails from './ShareDetails';

// utilis
import FadeAndSlideIn from '../../Utilis/FadeAndSlideIn';

const ShareOptions = (props) => {
  // event handlers
  const isSharedHandler = (event) => {
    const isShared = event.target.checked;
    let expiration = props.value.expiration;
    if (!isShared) expiration = null;

    props.onChange({ isShared, expiration }, 'share');
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSave();
  };

  return (
    <FadeAndSlideIn in>
      <form className="note-options-share" onSubmit={submitHandler}>
        {
          props.value.isShared &&
          <ShareDetails {...props} />
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
    </FadeAndSlideIn>
  );
};

ShareOptions.propTypes = {
  value: PropTypes.shape({
    isShared: PropTypes.bool.isRequired,
    expiration: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ShareOptions;
