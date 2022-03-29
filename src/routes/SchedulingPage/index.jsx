/**
 * Scheduling Page
 *
 * Allows users to set up bookings for an interview in Nylas
 */
import React, { useEffect, useState } from "react";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import { getInterview } from "services/interviews";
import { INTERVIEW_STATUS } from "constants";
import withAuthentication from "../../hoc/withAuthentication";
import NylasSchedulerPage from "components/NylasSchedulerPage";

const SchedulingPage = ({ interviewId }) => {
  const [schedulingPageUrl, setSchedulingPageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // if there are some candidates to review, then show "To Review" tab by default
  useEffect(() => {
    getAuthUserProfile()
      .then((res) => {
        return {
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
        };
      })
      .then((profile) => {
        getInterview(interviewId)
          .then(({ data }) => {
            if (data.status === INTERVIEW_STATUS.SCHEDULING) {
              setSchedulingPageUrl(
                `https://schedule.nylas.com/${data.nylasPageSlug}?email=${
                  profile.email
                }&name=${encodeURI(
                  profile.firstName + " " + profile.lastName
                )}&prefilled_readonly=true`
              );
            } else {
              setErrorMessage("No interviews scheduled");
            }
          })
          .catch((err) => {
            setErrorMessage(err);
          });
      });
  }, [interviewId]);

  return (
    <NylasSchedulerPage
      pageTitle="Schedule Interview"
      src={schedulingPageUrl}
      errorMessage={errorMessage}
      pageHeader="Schedule Interview"
      iframeTitle="Nylas Scheduling Page"
    />
  );
};

export default withAuthentication(SchedulingPage);
