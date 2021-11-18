/**
 * Cancel Interview Page
 *
 * Allows users to cancel an interview in Nylas
 */
import React, { useEffect, useState } from "react";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import { getInterview } from "services/interviews";
import { INTERVIEW_STATUS } from "constants";
import withAuthentication from "../../hoc/withAuthentication";
import NylasSchedulerPage from "components/NylasSchedulerPage";

const CancelInterviewPage = ({ interviewId }) => {
  const [schedulingPageUrl, setSchedulingPageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
            if (data.status === INTERVIEW_STATUS.SCHEDULED ||data.status === INTERVIEW_STATUS.RESCHEDULED) {
              setSchedulingPageUrl(
                `https://schedule.nylas.com/${data.nylasPageSlug}/cancel/${data.nylasEventEditHash}?email=${
                  profile.email
                }&name=${encodeURI(
                  profile.firstName + " " + profile.lastName
                )}&prefilled_readonly=true`
              );
            } else {
              setErrorMessage(`This interview has status ${data.status} and cannot be cancelled.`);
            }
          })
          .catch((err) => {
            setErrorMessage(err);
          });
      });
  }, [interviewId]);

  return (
    <NylasSchedulerPage
      pageTitle="Cancel Interview"
      src={schedulingPageUrl}
      errorMessage={errorMessage}
      pageHeader="Cancel Interview"
      iframeTitle="Nylas Cancel Schedule Page"
    />
  );
};

export default withAuthentication(CancelInterviewPage);
