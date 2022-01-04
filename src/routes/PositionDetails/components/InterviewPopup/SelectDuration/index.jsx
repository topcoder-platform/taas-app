import React, { useState, useEffect } from "react";
import cn from "classnames";
import PT from "prop-types";
import Button from "components/Button";
import StepsIndicator from "../../StepsIndicator";
import InterviewTypeIcon from "../../../../../assets/images/icon-interview-type.svg";
import {
  SCHEDULE_INTERVIEW_STEPS,
  BUTTON_SIZE,
  BUTTON_TYPE,
  POPUP_STAGES,
} from "constants";
import "./styles.module.scss";

/**
 * The select duration will let user to select the duration of the interview
 */
const SelectDuration = ({ onContinue, onGoBack, scheduleDetails }) => {
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    if (scheduleDetails.duration) {
      setDuration(scheduleDetails.duration);
    }
  }, [scheduleDetails]);

  const changeDuration = (changedDuration) => {
    setDuration(changedDuration);
  };

  const onContinueAhead = () => {
    onContinue(POPUP_STAGES.SEND_INTERVIEW_INVITE, {
      duration,
    });
  };

  return (
    <div styleName="select-duration">
      <StepsIndicator
        steps={SCHEDULE_INTERVIEW_STEPS}
        currentStep="selectType"
      />
      <div styleName="interview-types">
        <div
          styleName={cn("interview", "thirty-minutes", {
            "selected-duration": duration === 30,
          })}
          onClick={() => changeDuration(30)}
        >
          <div
            styleName={cn("dot", {
              "selected-dot": duration === 30,
            })}
          />
          <InterviewTypeIcon />
          <div styleName="interview-type-text">30 Minute Interview</div>
        </div>
        <div
          styleName={cn("interview", {
            "selected-duration": duration === 60,
          })}
          onClick={() => changeDuration(60)}
        >
          <div
            styleName={cn("dot", {
              "selected-dot": duration === 60,
            })}
          />
          <InterviewTypeIcon />
          <div styleName="interview-type-text">60 Minute Interview</div>
        </div>
      </div>
      <div styleName="button-wrapper">
        {/* issue #598, hide `Manage connected calendar` button temporarily   */}
        <div></div>
        {/* <div */}
        {/*   onClick={() => */}
        {/*     onContinue(POPUP_STAGES.MANAGE_CALENDAR, { */}
        {/*       duration, */}
        {/*     }) */}
        {/*   } */}
        {/*   styleName="manage-calendar" */}
        {/* > */}
        {/*   Manage connected calendar */}
        {/* </div> */}
        <div styleName="button-wrapper-right-pane">
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
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

SelectDuration.propTypes = {
  scheduleDetails: PT.object,
  onContinue: PT.func,
  onGoBack: PT.func,
};

export default SelectDuration;
