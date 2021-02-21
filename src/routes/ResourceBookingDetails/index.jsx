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
  const [resource, loadingError] = useData(
    getReourceBookingById,
    resourceBookingId
  );
  const [team, loadingTeamError] = useData(getTeamById, teamId);
  const [jobTitle, setJobTitle] = useState("");
  const [member, setMember] = useState("");

  useEffect(() => {
    if (team) {
      const resourceWithMemberDetails = _.find(team.resources, {
        id: resourceBookingId,
      });

      // resource inside Team object has all the member details we need
      setMember(resourceWithMemberDetails);

      if (resourceWithMemberDetails.jobId) {
        const job = _.find(team.jobs, { id: resourceWithMemberDetails.jobId });
        setJobTitle(
          _.get(job, "title", `<Not Found> ${resourceWithMemberDetails.jobId}`)
        );
      } else {
        setJobTitle("<Not Assigned>");
      }
    }
  }, [team, resourceBookingId]);

  return (
    <Page title="Member Details">
      {!(member && resource) ? (
        <LoadingIndicator error={loadingError || loadingTeamError} />
      ) : (
        <>
          <PageHeader
            title="Member Details"
            backTo={`/taas/myteams/${teamId}`}
          />
          <div styleName="content-wrapper">
            <ResourceSummary member={member} />
            <ResourceDetails resource={resource} jobTitle={jobTitle} />
            <div styleName="actions">
              <Button
                size="medium"
                routeTo={`/taas/myteams/${teamId}/rb/${resource.id}/edit`}
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
