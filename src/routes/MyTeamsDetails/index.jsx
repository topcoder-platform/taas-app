/**
 * MyTeamsDetails
 *
 * Page for team details.
 * It gets `teamId` from the router.
 */
import React from "react";
import PT from "prop-types";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import { useData } from "hooks/useData";
import { getTeamById } from "services/teams";
import LoadingIndicator from "components/LoadingIndicator";
import { formatOpenPositions } from "utils/format";
import TeamSummary from "./components/TeamSummary";
import TeamMembers from "./components/TeamMembers";
import TeamPositions from "./components/TeamPositions";
import withAuthentication from "../../hoc/withAuthentication";

const MyTeamsDetails = ({ teamId }) => {
  const [team, loadingError] = useData(getTeamById, teamId);

  const getOpenPositionsLabel = (job) => {
    return formatOpenPositions(job, team.resources);
  };

  return (
    <Page title="Team Details">
      {!team ? (
        <LoadingIndicator error={loadingError} />
      ) : (
        <>
          <PageHeader title={team.name} backTo="/taas/myteams" />
          <TeamSummary team={team} />
          <TeamMembers team={team} />
          <TeamPositions
            positions={team.jobs || []}
            teamId={teamId}
            getOpenPositionsLabel={getOpenPositionsLabel}
          />
        </>
      )}
    </Page>
  );
};

MyTeamsDetails.propTypes = {
  teamId: PT.string,
};

export default withAuthentication(MyTeamsDetails);
