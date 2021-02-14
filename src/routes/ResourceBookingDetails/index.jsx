/**
 * ResourceBookingDetails
 *
 * Page for resource booking details.
 * It gets `teamId` and `resourceBookingId` from the router.
 */
import React, { useMemo, useState, useEffect } from "react";
import PT from "prop-types";
import _ from "lodash";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import { useData } from "hooks/useData";
import { getReourceBookingById } from "services/resourceBookings";
import { getTeamById } from "services/teams";
import LoadingIndicator from "../../components/LoadingIndicator";
import withAuthentication from "../../hoc/withAuthentication";
import Button from "../../components/Button";
import ResourceSummary from "./ResourceSummary";
import ResourceDetails from "./ResourceDetails";
import "./styles.module.scss";

const ResourceBookingDetails = ({ teamId, resourceBookingId }) => {
  const [rb, loadingError] = useData(getReourceBookingById, resourceBookingId);
  const [team, loadingTeamError] = useData(getTeamById, teamId);

  const member = useMemo(() => {
    if (team) {
      const resource = _.find(
        team.resources,
        (r) => r.id === resourceBookingId
      );
      let job;
      if (resource.jobId) {
        job = _.find(team.jobs, { id: resource.jobId });
      }
      resource.jobTitle = _.get(job, "title", "<Not Assigned>");
      return resource;
    }
  }, [team, resourceBookingId]);

  return (
    <Page title="Member Details">
      {!member ? (
        <LoadingIndicator error={loadingError} />
      ) : (
        <>
          <PageHeader
            title="Member Details"
            backTo={`/taas/myteams/${teamId}`}
          />
          <div styleName="content-wrapper">
            <ResourceSummary candidate={member} />
            <ResourceDetails resource={{ ...rb, title: member.jobTitle }} />
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
