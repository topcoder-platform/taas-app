/**
 * ResourceBookingDetails
 *
 * Page for resource booking details.
 * It gets `teamId` and `resourceBookingId` from the router.
 */
import React, { useState, useEffect } from "react";
import PT from "prop-types";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import { useData } from "hooks/useData";
import { getReourceBookingById } from "services/resourceBookings";
import { getPositionDetails } from "services/teams";
import LoadingIndicator from "../../components/LoadingIndicator";
import withAuthentication from "../../hoc/withAuthentication";
import Button from "../../components/Button";
import ResourceSummary from "./ResourceSummary";
import ResourceDetails from "./ResourceDetails";
import "./styles.module.scss";

const ResourceBookingDetails = ({ teamId, resourceBookingId }) => {
  const [jobId, setJobId] = useState(null);
  const [title, setTitle] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [rb, loadingError] = useData(getReourceBookingById, resourceBookingId);

  useEffect(() => {
    if (!!rb) {
      setJobId(rb.jobId);
    }
  }, [rb]);

  useEffect(() => {
    if (jobId) {
      getPositionDetails(teamId, jobId).then((response) => {
        const data = response.data.candidates?.find(
          (x) => x.userId === rb.userId
        );
        setCandidate(data);
        setTitle(response.data.title);
      });
    }
  }, [jobId]);

  return (
    <Page title="Member Details">
      {!candidate ? (
        <LoadingIndicator error={loadingError} />
      ) : (
        <>
          <PageHeader
            title="Member Details"
            backTo={`/taas/myteams/${teamId}`}
          />
          <div styleName="content-wrapper">
            <ResourceSummary candidate={candidate} />
            <ResourceDetails resource={{ ...rb, title: title }} />
            <div styleName="actions">
              <Button
                size="medium"
                routeTo={`/taas/myteams/${teamId}/rb/${rb.id}/edit`}
              >
                Edit Member Details
              </Button>
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

ResourceBookingDetails.propTypes = {
  teamId: PT.string,
  resourceBookingId: PT.string,
};

export default withAuthentication(ResourceBookingDetails);
