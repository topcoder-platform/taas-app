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
import TeamSummary from "./components/TeamSummary";
import TeamMembers from "./components/TeamMembers";
import TeamPositions from "./components/TeamPositions";
import withAuthentication from "../../hoc/withAuthentication";
import EmailPopup from "components/EmailPopup";

const MyTeamsDetails = ({ teamId }) => {
  const [team, loadingError] = useData(getTeamById, teamId);

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
            resources={team.resources}
          />
        </>
      )}
      <EmailPopup />
    </Page>
  );
};

MyTeamsDetails.propTypes = {
  teamId: PT.string,
};

export default withAuthentication(MyTeamsDetails);
