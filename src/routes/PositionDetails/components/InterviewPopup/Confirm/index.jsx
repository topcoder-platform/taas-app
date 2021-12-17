import React, { useState, useEffect } from "react";
import PT from "prop-types";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { useParams } from "@reach/router";
import { loadPosition } from "../../../actions";
import Button from "components/Button";
import { toastr } from "react-redux-toastr";

import StepsIndicator from "../../StepsIndicator";
import Spinner from "components/CenteredSpinner";
import { confirmInterview } from "../../../../../services/interviews";
import {
  SCHEDULE_INTERVIEW_STEPS,
  BUTTON_SIZE,
  BUTTON_TYPE,
  POPUP_STAGES,
} from "constants";
import "./styles.module.scss";
import { getPrimaryCalendar, isCalendarInSync } from "utils/helpers";

/**
 * This component is used to get the confirmation before scheduling the interview
 */
const Confirm = ({
  scheduleDetails,
  candidate,
  onGoBack,
  onContinue,
  onShowingLoader,
  userSettings,
  getSettingsModular,
}) => {
  const { teamId, positionId } = useParams();
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [syncCalendarTimeoutId, setSyncCalendarTimeoutId] = useState(null);
  // flag indicating the 1st attempt to refetch UserMeetingSettings is made, must repeat requests every 10secs
  const [initiateInterviewConfirmation, setInitiateInterviewConfirmation] = useState(null);
  // each timeout equals 10 seconds - so 120 seconds = 2mins = 12 timeouts - this excludes time taken for request response
  const [totalSyncTimeouts, setTotalSyncTimeouts] = useState(0);
  const dispatch = useDispatch();
  const { handle, id: candidateId } = candidate;
  const { duration } = scheduleDetails;

  // check if primary calendar is syncing or synced and handle accordingly
  useEffect(() => {
    const primaryCalendar = getPrimaryCalendar(userSettings);
    const calendarSynced = primaryCalendar ? isCalendarInSync(primaryCalendar) : false;

    // to know if calendar is ready and synced to request interview, we check for primary calendar 
    // & its sync status, combined with either the timeoutid or initiate confirmation flag
    if ((primaryCalendar && calendarSynced) && (syncCalendarTimeoutId || initiateInterviewConfirmation))
    {
      // clear timeout since calendar is now synced
      clearTimeout(syncCalendarTimeoutId);

      // reset state
      setSyncCalendarTimeoutId(null);
      setInitiateInterviewConfirmation(false);

      // disable loading indicator
      onSetLoadingMessage(`Scheduling interview...`);

      // continue with interview scheduling
      onContinueAhead();
    }
    else if ((primaryCalendar && !calendarSynced) && (syncCalendarTimeoutId || initiateInterviewConfirmation))
    {
      if (totalSyncTimeouts > 12)
      {
        onContinue(POPUP_STAGES.CALENDAR_SYNC_TIMED_OUT);
      }
      else
      {
        // since primary calendar is still not synced, reset timeout
        setSyncCalendarTimeoutId(setTimeout(() => getSettingsModular(), 10000));
        setTotalSyncTimeouts(totalSyncTimeouts + 1);
      }
    }

    // clear timeout on component unmount
    return () => clearTimeout(syncCalendarTimeoutId);
  }, [userSettings]);

  const onSetLoadingMessage = (text) => setLoadingMessage(text);

  /**
   * This will trigger the API call to the server to request an interview
   */
  const onContinueAhead = () => {
    const params = {
      hostTimezone: scheduleDetails.timezone,
      duration: scheduleDetails.duration,
      availableTime: scheduleDetails.slots,
    };
    onSetLoadingMessage(null);
    onShowingLoader(true);

    confirmInterview(candidateId, params)
      .then(() => dispatch(loadPosition(teamId, positionId)))
      .then(() => onContinue(POPUP_STAGES.SUCCESS))
      .catch((e) => {
        toastr.error(e.message);
      })
      .finally(() => {
        onShowingLoader(false);
      });
  };

  const inviteInterviewCandidate = (userSettingsParam) => {
    let primaryCalendar = getPrimaryCalendar(userSettingsParam);
    let calendarSynced = isCalendarInSync(primaryCalendar);

    if (primaryCalendar && !calendarSynced)
    {
      // show loading indicator with message
      onSetLoadingMessage(`Syncing your new calendar ${primaryCalendar.email}, it might take a few minutes...`);
      
      // fetch UserMeetingSettings in the background, for the 1st time, no timeout is necessary,
      // so we set initiateInterviewConfirmation value to true
      getSettingsModular();
      setInitiateInterviewConfirmation(true);
    }
    else if (primaryCalendar && calendarSynced)
    {
      onContinueAhead();
    }
  }

  return (
    <>
      {loadingMessage && <div
        styleName={cn("spinner-wrapper", {
          "show-spinner": loadingMessage,
        })}
      >
        <Spinner stype="Oval" width={80} height={80} />
        <p styleName="loading-message">{loadingMessage}</p>
      </div>}
      {!loadingMessage && <div styleName="confirm-wrapper">
        <StepsIndicator steps={SCHEDULE_INTERVIEW_STEPS} currentStep="confirm" />
        <div styleName="confirm-text">
          Send a <span styleName="confirm-text-bold">{duration} Minute</span>{" "}
          Interview invite to <span styleName="confirm-text-bold">{handle}</span>.
          This invite will allow <span styleName="confirm-text-bold">{handle}</span> to select and schedule an interview date
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
            onClick={() => inviteInterviewCandidate(userSettings)}
            disabled={initiateInterviewConfirmation}
            size={BUTTON_SIZE.MEDIUM}
            type={BUTTON_TYPE.PRIMARY}
          >
            Confirm
          </Button>
        </div>
      </div>}
    </>
  );
};

Confirm.propTypes = {
  scheduleDetails: PT.object,
  candidate: PT.object,
  onGoBack: PT.func,
  onContinue: PT.func,
  onShowingLoader: PT.func,
  userSettings: PT.object,
  getSettingsModular: PT.func,
};

export default Confirm;
