import Button from "components/Button";
import cn from "classnames";
import PT from "prop-types";
import { BUTTON_SIZE, BUTTON_TYPE } from "constants";
import GoogleLogo from "../../../../../assets/images/icon-google.svg";
import MicrosoftLogo from "../../../../../assets/images/icon-microsoft.svg";
import { connectCalendar, deleteCalendar } from "../../../../../services/interviews";
import React, { useEffect, useState } from "react";
import { toastr } from "react-redux-toastr";
import { useLocation } from "@reach/router";
import Spinner from "components/CenteredSpinner";
import "./styles.module.scss";

/**
 * The component shown to connect to a new calendar if no calendar is connected for the user so far
 * Also, the component act as the connected calendar manager where the user can switch the calendar
 * @param {*} param0
 * @returns
 */
const ConnectCalendar = ({
  isConnected,
  calendar,
  userProfile,
  onGoingBack,
  onCalendarRemoved,
  candidate,
}) => {
  const [showLoader, setLoader] = useState();

  const onRemoveCalendar = (calendar) => {
    const { id } = userProfile;
    const { id: calendarId } = calendar;
    setLoader(true);
    deleteCalendar(id, calendarId)
      .then((res) => {
        onCalendarRemoved();
        toastr.success("Calendar was successfully disconnected");
      })
      .catch((e) => {
        toastr.error("Error disconnecting calendar", e.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleConnectCalendar = () => {
    // construct the appRedirectUrl with current window url and added query params
    const appRedirectUrl = `${window.location.href}?interviewWithCandidate=${candidate.id}`;

    return connectCalendar(userProfile.id, appRedirectUrl)
  };

  return (
    <div styleName="connect-calendar">
      {!isConnected && (
        <div styleName="information">
          Share your availability from your Google or Outlook calendar to make
          scheduling easier.{" "}
        </div>
      )}

      {isConnected && (
        <>
          <div styleName="connected-section">
            <span styleName="connected-to-text">
              {'Currently connected to: '} 
              <span styleName="email-address">
                {calendar && calendar.email}
              </span>
            </span>
            {!showLoader && (
              <button
                styleName="remove-button"
                onClick={() => onRemoveCalendar(calendar)}
              >
                Remove
              </button>
            )}

            {showLoader && <Spinner stype="Oval" width="20" height="20" />}
          </div>
          <div styleName="switch-calendar">Switch to a New calendar</div>
        </>
      )}
      {showLoader && <Spinner stype="Oval" width="20" height="20" />}
      {!showLoader && <>  
        <div styleName="button-wrapper">
          <Button
            size={BUTTON_SIZE.SMALL}
            styleName={cn("button", "google-btn")}
            onClick={() => handleConnectCalendar()}
          >
            <GoogleLogo styleName="icons-wrapper" />
            Sign in with google
          </Button>
          <Button
            size={BUTTON_SIZE.SMALL}
            onClick={() => handleConnectCalendar()}
          >
            <MicrosoftLogo styleName="icons-wrapper" />
            Sign in with microsoft
          </Button>
        </div>
      </>}

      <div styleName="description">
        Our calendar integration only checks the duration and free/busy status
        of the events in your calendar so that we don’t book you when you’re
        busy. We never store who you are meeting with, their email address, the
        meeting title, or any other details about the appointments in your
        connected calendar.
      </div>

      <div
        styleName={cn("footer-button-wrapper", {
          "connected-account": isConnected,
        })}
      >
        <Button
          size={BUTTON_SIZE.MEDIUM}
          type={BUTTON_TYPE.SECONDARY}
          onClick={onGoingBack}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

ConnectCalendar.propTypes = {
  isConnected: PT.bool.isRequired,
  userProfile: PT.object,
  calendar: PT.shape({
    accountProvider: PT.string,
    accountEmail: PT.string,
    isPrimary: PT.string,
  }),
  onCalendarRemoved: PT.func,
  onGoingBack: PT.func,
  candidate: PT.object,
};

export default ConnectCalendar;
