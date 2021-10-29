import React from "react";
import PT from "prop-types";
import Button from "components/Button";
import { BUTTON_SIZE, BUTTON_TYPE, POPUP_STAGES } from "constants";
import "./styles.module.scss";

/**
 * The success component shown once the interview is scheduled successfully
 */
const Success = ({ candidate, onContinue }) => {
  const { handle } = candidate;
  return (
    <div styleName="success-wrapper">
      <div styleName="success-text">
        Your interview invite for {handle} was sent successfully. Once your
        candidate selects a time, you will receive a confirmation email.
      </div>
      <div styleName="button-wrapper">
        <Button
          onClick={() => onContinue(POPUP_STAGES.CLOSE)}
          size={BUTTON_SIZE.MEDIUM}
          type={BUTTON_TYPE.PRIMARY}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

Success.propTypes = {
  candidate: PT.object,
};

export default Success;
