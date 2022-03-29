import Button from "components/Button";
import PT from "prop-types";
import {
  ALLOW_CONNECTING_CALENDAR,
  BUTTON_SIZE,
  POPUP_STAGES,
} from "constants";

import React from "react";
import "./styles.module.scss";

/**
 * The component shown to select either to add
 * interviewee's availability or to connect to
 * the calendar
 * @param {*} param0
 * @returns
 */
const ScheduleInterview = ({ onClick }) => {
  return (
    <div styleName="schedule-interview">
      <Button
        size={BUTTON_SIZE.LARGE}
        onClick={() => onClick(POPUP_STAGES.MANAGE_AVAILABILITY)}
      >
        Add your availability
      </Button>
      {ALLOW_CONNECTING_CALENDAR && (
        <>
          <div styleName="or-label">OR</div>
          <Button
            size={BUTTON_SIZE.LARGE}
            onClick={() => onClick(POPUP_STAGES.CONNECT_CALENDAR)}
          >
            Connect your calendar
          </Button>
        </>
      )}
    </div>
  );
};

ScheduleInterview.propTypes = {
  onClick: PT.func,
};

export default ScheduleInterview;
