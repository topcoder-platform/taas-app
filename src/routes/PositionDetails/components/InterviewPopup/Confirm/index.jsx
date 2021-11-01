import React from "react";
import PT from "prop-types";
import Button from "components/Button";
import { toastr } from "react-redux-toastr";

import StepsIndicator from "../../StepsIndicator";
import { confirmInterview } from "../../../../../services/interviews";
import {
  SCHEDULE_INTERVIEW_STEPS,
  BUTTON_SIZE,
  BUTTON_TYPE,
  POPUP_STAGES,
} from "constants";
import "./styles.module.scss";

/**
 * This component is used to get the confirmation before scheduling the interview
 */
const Confirm = ({
  scheduleDetails,
  candidate,
  onGoBack,
  onContinue,
  onShowingLoader,
}) => {
  const { handle, id: candidateId } = candidate;
  const { duration } = scheduleDetails;

  /**
   * This will trigger the API call to the server to request an interview
   */
  const onContinueAhead = () => {
    const params = {
      timezone: scheduleDetails.timezone,
      duration: scheduleDetails.duration,
      availableTime: scheduleDetails.slots,
    };
    onShowingLoader(true);

    confirmInterview(candidateId, params)
      .then(() => {
        onContinue(POPUP_STAGES.SUCCESS);
      })
      .catch((e) => {
        toastr.error(e.message);
      })
      .finally(() => {
        onShowingLoader(false);
      });
  };

  return (
    <div styleName="confirm-wrapper">
      <StepsIndicator steps={SCHEDULE_INTERVIEW_STEPS} currentStep="confirm" />
      <div styleName="confirm-text">
        Send a <span styleName="confirm-text-bold">{duration} Minute</span>{" "}
        Interview invite to <span styleName="confirm-text-bold">{handle}</span>.
        This invite will allow {handle} to select and schedule an interview date
        and time based on your availability.
      </div>

      <div styleName="button-wrapper">
        <Button
          styleName="back-button"
          onClick={() => onGoBack()}
          size={BUTTON_SIZE.MEDIUM}
          type={BUTTON_TYPE.SECONDARY}
        >
          Back
        </Button>
        <Button
          onClick={() => onContinueAhead()}
          size={BUTTON_SIZE.MEDIUM}
          type={BUTTON_TYPE.PRIMARY}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

Confirm.propTypes = {
  scheduleDetails: PT.object,
  candidate: PT.object,
  onGoBack: PT.func,
  onContinue: PT.func,
  onShowingLoader: PT.func,
};

export default Confirm;
