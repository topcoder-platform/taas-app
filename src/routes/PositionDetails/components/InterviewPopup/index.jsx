import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import PT from "prop-types";
import Spinner from "components/CenteredSpinner";
import { toastr } from "react-redux-toastr";

import ScheduleInterview from "./ScheduleInterview";
import BaseModal from "components/BaseModal";
import ConnectCalendar from "./ConnectCalendar";
import SelectDuration from "./SelectDuration";
import Confirm from "./Confirm";
import Success from "./Success";

import { getUserSettings } from "../../../../services/interviews";
import IconCrossBlack from "../../../../assets/images/icon-cross-black.svg";
import ManageAvailability from "./ManageAvailability";
import { POPUP_STAGES, INTERVIEW_POPUP_STAGES } from "constants";

import "./styles.module.scss";

/**
 * Interview pop up component which contains the step by step process of
 * scheduling or rescheduling the interviews
 * @param {*}
 * @returns
 */
const InterviewPopup = ({
  initialStage = POPUP_STAGES.SCHEDULE_INTERVIEW,
  open = false,
  onClose,
  candidate,
}) => {
  const [stage, setStage] = useState(initialStage);
  const [previousStage, setPreviousStage] = useState(initialStage);
  const [isLoading, setLoading] = useState(false);
  const [userSettings, setUserSettings] = useState();
  const { v5UserProfile } = useSelector((state) => state.authUser);
  const [scheduleDetails, setScheduleDetails] = useState({
    timezone: "",
    slots: [],
  });

  useEffect(() => {
    if (open) {
      getSettings();
    }
  }, [open]);

  const onCloseInterviewPopup = () => {
    setStage("");
    setScheduleDetails({
      timezone: "",
      slots: [],
    });
    onClose();
  };

  const prepareSlots = (userSettings) => ({
    timezone: userSettings.defaultTimezone,
    slots:
      (userSettings.defaultAvailableTime &&
        userSettings.defaultAvailableTime.map((item) => ({
          days: item.days,
          end: parseInt(item.end.split(":")[0]),
          start: parseInt(item.start.split(":")[0]),
        }))) ||
      [],
  });

  /**
   * Gets the settings from the backend and checks if the calendar is already available
   */
  const getSettings = () => {
    setLoading(true);
    getUserSettings(v5UserProfile.id)
      .then((res) => {
        setUserSettings(res.data);
        setScheduleDetails(prepareSlots(res.data));
        setStage(POPUP_STAGES.MANAGE_AVAILABILITY);
      })
      .catch((e) => {
        if (e.response && e.response.status === 404) {
          setStage(POPUP_STAGES.SCHEDULE_INTERVIEW);
        } else {
          toastr.error("Failed to get user settings");
          onCloseInterviewPopup();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Get the calendar which is not of provider nylas
   * @param {*} settings
   * @returns
   */
  const getCalendar = (settings) => {
    if (!settings) return null;
    const calendar =
      (settings.nylasCalendars &&
        settings.nylasCalendars.filter(
          (item) => item.accountProvider !== "nylas"
        )) ||
      [];
    // Take the first calendar which are other than nylas calendar
    return calendar[0];
  };

  /**
   * Handler to change to the next stage
   * @param {*} stage
   */
  const onChangeStage = (nextState, supportData) => {
    setPreviousStage(stage);
    if (nextState === POPUP_STAGES.CONNECT_CALENDAR) {
      const calendar = getCalendar(userSettings);
      if (calendar && calendar.isPrimary) {
        setStage(POPUP_STAGES.MANAGE_CALENDAR);
      } else {
        setStage(nextState);
      }
    } else if (nextState === POPUP_STAGES.MANAGE_CALENDAR) {
      const calendar = getCalendar(userSettings);

      if (!calendar) {
        setStage(POPUP_STAGES.CONNECT_CALENDAR);
      } else {
        setStage(nextState);
      }
    } else if (nextState === POPUP_STAGES.CLOSE) {
      onClose();
    } else {
      setStage(nextState);
    }

    if (supportData) {
      setScheduleDetails({
        ...scheduleDetails,
        ...supportData,
      });
    }
  };

  const onShowingLoader = (loading) => {
    setLoading(loading);
  };

  /**
   * Removes the calendar from the state once it is removed from the server
   */
  const onCalendarRemoved = () => {
    setUserSettings({
      ...userSettings,
      nylasCalendars: [],
    });

    setStage(POPUP_STAGES.CONNECT_CALENDAR);
  };

  /**
   * Get the component by current stage
   * @returns
   */
  const getComponentByState = () => {
    switch (stage) {
      case POPUP_STAGES.SCHEDULE_INTERVIEW:
        return <ScheduleInterview onClick={onChangeStage} />;
      case POPUP_STAGES.CONNECT_CALENDAR:
        return (
          <ConnectCalendar isConnected={false} onGoingBack={onGoingBack} />
        );
      case POPUP_STAGES.MANAGE_CALENDAR:
        const calendar = getCalendar(userSettings);
        return (
          <ConnectCalendar
            isConnected
            userProfile={v5UserProfile}
            calendar={calendar}
            onGoingBack={onGoingBack}
            onCalendarRemoved={onCalendarRemoved}
          />
        );
      case POPUP_STAGES.MANAGE_AVAILABILITY:
        return (
          <ManageAvailability
            scheduleDetails={scheduleDetails}
            onContinue={onChangeStage}
            onGoBack={onGoingBack}
          />
        );
      case POPUP_STAGES.SELECT_DURATION:
        return (
          <SelectDuration
            scheduleDetails={scheduleDetails}
            onContinue={onChangeStage}
            onGoBack={onGoingBack}
          />
        );
      case POPUP_STAGES.SEND_INTERVIEW_INVITE:
        return (
          <Confirm
            scheduleDetails={scheduleDetails}
            userProfile={v5UserProfile}
            onContinue={onChangeStage}
            onGoBack={onGoingBack}
            onShowingLoader={onShowingLoader}
            candidateId={candidate.id}
          />
        );
      case POPUP_STAGES.SUCCESS:
        return (
          <Success userProfile={v5UserProfile} onContinue={onChangeStage} />
        );
      default:
        return null;
    }
  };

  /**
   * Logic to go back to the previous step in the interview scheduling process
   */
  const onGoingBack = () => {
    // Only if the current stage is
    if (
      stage === POPUP_STAGES.MANAGE_CALENDAR ||
      stage === POPUP_STAGES.CONNECT_CALENDAR
    ) {
      setStage(previousStage);
      return;
    }

    switch (stage) {
      case POPUP_STAGES.SELECT_DURATION:
        setStage(POPUP_STAGES.MANAGE_AVAILABILITY);
        break;
      case POPUP_STAGES.SEND_INTERVIEW_INVITE:
        setStage(POPUP_STAGES.SELECT_DURATION);
        break;
      default:
        setStage(POPUP_STAGES.SCHEDULE_INTERVIEW);
        break;
    }
  };

  // Gets the current stage of the process
  const getCurrentStage = () =>
    INTERVIEW_POPUP_STAGES.find((item) => item.id === stage);

  const currentStage = getCurrentStage();

  const extraModalStyle = {
    minHeight: "480px",
    maxWidth: "600px",
  };

  return (
    <div>
      <BaseModal
        open={open}
        title={currentStage && currentStage.title}
        alignTitleCenter={currentStage && currentStage.isCenterAligned}
        showButton={false}
        onClose={onCloseInterviewPopup}
        extraModalStyle={extraModalStyle}
        closeIcon={<IconCrossBlack width="15px" height="15px" />}
      >
        <div styleName="modal-content">
          <div
            styleName={cn("spinner-wrapper", {
              "show-spinner": isLoading,
            })}
          >
            <Spinner stype="Oval" width="80" height="80" />
          </div>
          <div
            styleName={cn("component-wrapper", {
              "show-component-wrapper": !isLoading,
            })}
          >
            {!isLoading && getComponentByState()}
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

InterviewPopup.propTypes = {
  candidate: PT.object.isRequired,
  open: PT.bool,
  initialStage: PT.string,
  onClose: PT.func.isRequired,
};

export default InterviewPopup;