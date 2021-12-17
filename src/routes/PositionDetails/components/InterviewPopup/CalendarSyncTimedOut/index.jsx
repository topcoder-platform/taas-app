import React from "react";
import PT from "prop-types";
import Button from "components/Button";
import { BUTTON_SIZE, BUTTON_TYPE, POPUP_STAGES } from "constants";
import "./styles.module.scss";
import { getPrimaryCalendar } from "utils/helpers";

/**
 * The CalendarSyncTimedOut component showing error message about calendar sync failure
 */
const CalendarSyncTimedOut = ({ userSettings, onContinue }) => {
  const primaryCalendar = getPrimaryCalendar(userSettings);

  return (
    <div styleName="timedout-wrapper">
      <div styleName="timedout-text">
        <p>Strange, it takes too long to sync your calendar {primaryCalendar.email}.</p>
        <p>Please, try re-connecting your calendar by clicking "manage connected calendars". Would you have any issues, please don't hesitate to reach out to us by support@topcoder.com.</p>
      </div>
      <div styleName="button-wrapper">
        <Button
          onClick={() => onContinue(POPUP_STAGES.SEND_INTERVIEW_INVITE)}
          size={BUTTON_SIZE.MEDIUM}
          type={BUTTON_TYPE.PRIMARY}
        >
          OK
        </Button>
      </div>
    </div>);
}

CalendarSyncTimedOut.propTypes = {
  userSettings: PT.object,
};

export default CalendarSyncTimedOut;
