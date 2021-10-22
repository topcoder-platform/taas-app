/**
 * Scheduling Page
 *
 * Allows users to set up bookings for an interview in Nylas
 */
import React, { useEffect } from "react";
import { useLocation } from "@reach/router";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import _ from "lodash";
import Page from "components/Page";
import LoadingIndicator from "components/LoadingIndicator";
import PageHeader from "components/PageHeader";
import withAuthentication from "../../hoc/withAuthentication";
import { getSchedulingPage } from "services/scheduler";

const useQuery = (queryParam) => {
  const search = new URLSearchParams(useLocation().search);
  return search.get(queryParam);
};

const SchedulingPage = () => {
  const [schedulingPageUrl, setSchedulingPageUrl] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const interviewId = useQuery("interviewId");
  const roundId = useQuery("roundId");

  // if there are some candidates to review, then show "To Review" tab by default
  useEffect(() => {
    getAuthUserProfile()
      .then((res) => {
        return {
          handle: res.handle,
          email: res.email,
        };
      })
      .then((profile) => {
        getSchedulingPage(interviewId, roundId)
          .then((res) => {
            if (res.data.url) {
              setSchedulingPageUrl(
                `${res.data.url}?email=${profile.email}&name=${profile.handle}&prefilled_readonly=true`
              );
            } else {
              setErrorMessage("No interviews scheduled");
            }
          })
          .catch((err) => {
            setErrorMessage(err);
          });
      });
  }, [interviewId, roundId]);

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
