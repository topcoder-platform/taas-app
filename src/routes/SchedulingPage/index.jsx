/**
 * Scheduling Page
 *
 * Allows users to set up bookings for an interview in Nylas
 */
import React, { useEffect, useState } from "react";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import _ from "lodash";
import Page from "components/Page";
import LoadingIndicator from "components/LoadingIndicator";
import PageHeader from "components/PageHeader";
import { getInterview } from "services/scheduler";
import { INTERVIEW_STATUS } from "constants";
import withAuthentication from "../../hoc/withAuthentication";

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
            if (
              data.status === INTERVIEW_STATUS.SCHEDULED ||
              data.status === INTERVIEW_STATUS.RESCHEDULED
            ) {
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
    <Page title="Schedule Interview">
      {!schedulingPageUrl ? (
        <LoadingIndicator error={errorMessage} />
      ) : (
        <>
          <PageHeader title="Schedule Interview" />
          <iframe
            title="Nylas Scheduling Page"
            src={schedulingPageUrl}
            width="1020"
            height="900"
          />
        </>
      )}
    </Page>
  );
};

export default withAuthentication(SchedulingPage);
