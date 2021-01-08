/**
 * MyTeamsDetails
 *
 * Page for team details.
 * It gets `teamId` from the router.
 */
import React from "react";
import PT from "prop-types";
import LayoutContainer from "components/LayoutContainer";
import PageHeader from "components/PageHeader";
import { useData } from "hooks/useData";
import { getTeamById } from "services/teams";
import LoadingIndicator from "components/LoadingIndicator";
import TeamSummary from "./components/TeamSummary";
import TeamMembers from "./components/TeamMembers";
import TeamPositions from "./components/TeamPositions";
import Authentication from '../../components/Authentication'
import { useAsync } from "react-use";

const MyTeamsDetails = ({ teamId }) => {
  const [team, loadingError] = useData(getTeamById, teamId);

  return (
    <LayoutContainer>
      {!team ? (
        <LoadingIndicator error={loadingError} />
      ) : (
        <>
          <PageHeader title={team.name} backTo="/taas/myteams" />
          <TeamSummary team={team} />
          <TeamMembers team={team} />
          <TeamPositions positions={team.jobs || []} teamId={teamId} />
        </>
      )}
    </LayoutContainer>
  );
};

MyTeamsDetails.propTypes = {
  teamId: PT.string,
};

export default Authentication(MyTeamsDetails);
