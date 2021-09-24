/**
 * InterviewDetailsPopup
 *
 * Popup that allows user to schedule an interview
 * Calls addInterview action
 */
import React, { useCallback, useEffect, useState } from "react";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { toastr } from "react-redux-toastr";
import { useDispatch, useSelector } from "react-redux";
import { addInterview } from "../../actions";
import User from "components/User";
import BaseModal from "components/BaseModal";
import FormField from "components/FormField";
import Button from "components/Button";
import { FORM_FIELD_TYPE, MAX_ALLOWED_INTERVIEWS } from "constants";
import "./styles.module.scss";
import RadioFieldGroup from "components/RadioFieldGroup";
import {
  initializeScheduler,
  editSchedulingPage,
  redirectToNylasHostedAuth,
} from "services/scheduler";

/* Validators for Form */

const validateIsEmail = (value) => {
  if (!value) return undefined;
  return /\S+@\S+\.\S+/.test(value) ? undefined : "Please enter valid email";
};

const INTERVIEW_DURATIONS = {
  THIRTY: "interview-30",
  SIXTY: "interview-60",
};

/********************* */
// TODO: preserve form input in case of error
function InterviewDetailsPopup({ open, onClose, candidate, openNext }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentDuration, setCurrentDuration] = useState(30)
  const [schedulingPage, setSchedulingPage] = React.useState({});
  const [updateInProgress, setUpdateInProgress] = React.useState(false);
  const [scheduleDataIsStale, setScheduleDataIsStale] = React.useState(false);
  const { loading } = useSelector((state) => state.positionDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!open || !candidate) {
      return;
    }

    setIsLoading(true);

    getAuthUserProfile()
      .then((res) => {
        // Initialize the Nylas scheduler
        const profile = {
          customer: {
            userId: res.userId,
            handle: res.handle,
            email: res.email,
            timezone: window.Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          candidate: {
            userId: candidate.userId,
            handle: candidate.handle,
            id: candidate.id,
          },
        };

        return initializeScheduler(profile);
      })
      .then((res) => {
        setSchedulingPage(res.data.schedulingPage);
        setCurrentDuration(res.data.schedulingPage.config.event.duration);
        setIsLoading(false);
      });
  }, [open, candidate]);

  const onChangeDuration = async (newDuration) => {
    let latestSchedulingPage;
    setUpdateInProgress(true);
    setCurrentDuration(newDuration === INTERVIEW_DURATIONS.THIRTY ? 30 : 60);

    if (scheduleDataIsStale) {
      // TODO
      // Should have used useRef() here, but could not figure it out in time!!
      // latestSchedulingPage = await fetchLatestSchedule()
      setScheduleDataIsStale(false);
    } else {
      latestSchedulingPage = JSON.parse(JSON.stringify(schedulingPage));
    }

    latestSchedulingPage.config.event.duration =
      newDuration === INTERVIEW_DURATIONS.THIRTY ? 30 : 60;

    await editSchedulingPage(
      schedulingPage.id,
      latestSchedulingPage,
      schedulingPage.edit_token
    );

    setSchedulingPage(latestSchedulingPage);
    setUpdateInProgress(false);
  };

  const onSubmitCallback = useCallback(
    async (formData) => {
      const hostEmail = formData.emails[0];
      const guestEmails =
        formData.emails
          .slice(1)
          .filter((email) => typeof email === "string" && email.length > 0) ||
        [];
      const interviewData = {
        templateUrl: formData.time,
        hostEmail,
        guestEmails,
      };

      try {
        await dispatch(addInterview(candidate.id, interviewData));
      } catch (err) {
        toastr.error("Interview Creation Failed", err.message);
        throw err;
      }
    },
    [dispatch, candidate]
  );

  // Display Nylas modal to edit availability time
  const openEditAvailabilityTimeModal = () => {
    // User could modify the availability time in this new modal
    // Set our current schedule data to stale, to fetch it later if user modifies duration
    setScheduleDataIsStale(true);

    // Show the Nylas modal
    window.nylas.scheduler.show({
      auth: {
        pageEditToken: schedulingPage.edit_token,
      },
      style: {
        modalTitle: "When are you free for meetings?",
      },
      behavior: {
        displayOnly: ["opening-hours"],
        disableViewingPages: true,
      },
    });
  };

  // Trigger Nylas's Hosted authentication
  const triggerNylasHostedAuth = () => {
    redirectToNylasHostedAuth();
  };

  if (isLoading) {
    return (
      <BaseModal
        open={open}
        onClose={onClose}
        closeButtonText="Cancel"
        title="Initializing Scheduler"
      >
        <p styleName="exceeds-max-number-txt">
          Initializing the scheduler based on the selected candidate. This may
          take some time. Do not close this window...
        </p>
      </BaseModal>
    );
  }

  // show the warning if exceeds MAX_ALLOWED_INTERVIEW
  if (
    candidate &&
    candidate.interviews &&
    candidate.interviews.length >= MAX_ALLOWED_INTERVIEWS
  ) {
    return (
      <BaseModal
        open={open}
        onClose={onClose}
        closeButtonText="Close"
        title="Schedule an Interview"
      >
        <p styleName="exceeds-max-number-txt">
          You've reached the cap of {MAX_ALLOWED_INTERVIEWS} interviews with
          this candidate. Now please make your decision to Select and Decline
          them.
        </p>
      </BaseModal>
    );
  }

  return (
    <Form
      initialValues={{
        time:
          currentDuration === 30
            ? INTERVIEW_DURATIONS.THIRTY
            : INTERVIEW_DURATIONS.SIXTY,
      }}
      onSubmit={onSubmitCallback}
      mutators={{
        ...arrayMutators,
      }}
    >
      {({
        handleSubmit,
        form: {
          mutators: { push },
          reset,
        },
        submitting,
        hasValidationErrors,
      }) => (
        <BaseModal
          open={open}
          onClose={() => {
            reset();
            onClose();
          }}
          title="Schedule an Interview"
          button={
            <Button
              onClick={() => {
                handleSubmit().then(() => {
                  reset();
                  onClose();
                  openNext();
                });
              }}
              size="medium"
              isSubmit
              disabled={
                submitting || hasValidationErrors || loading || updateInProgress
              }
            >
              Begin scheduling
            </Button>
          }
          disabled={submitting}
        >
          <div>
            <div styleName="top">
              <div styleName="user">
                {candidate === null ? (
                  ""
                ) : (
                  <User
                    user={{
                      ...candidate,
                      photoUrl: candidate.photo_url,
                    }}
                    hideFullName
                  />
                )}
                <p styleName="max-warning-txt">
                  You may have as many as {MAX_ALLOWED_INTERVIEWS} interviews
                  with each candidate for the job.
                </p>
              </div>
              <RadioFieldGroup
                name="time"
                isHorizontal
                radios={[
                  {
                    label: "30 Minute Interview",
                    value: INTERVIEW_DURATIONS.THIRTY,
                  },
                  {
                    label: "60 Minute Interview",
                    value: INTERVIEW_DURATIONS.SIXTY,
                  },
                ]}
                onChange={onChangeDuration}
              />
            </div>
            <div styleName="center array-item">
              <Button
                size="small"
                type="secondary"
                onClick={openEditAvailabilityTimeModal}
              >
                Edit availability time
              </Button>
              <Button
                size="small"
                type="secondary"
                onClick={triggerNylasHostedAuth}
              >
                Connect Calendar
              </Button>
            </div>
          </div>
        </BaseModal>
      )}
    </Form>
  );
}

export default InterviewDetailsPopup;
