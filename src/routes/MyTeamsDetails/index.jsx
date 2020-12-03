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
import { useAsync } from "react-use";
import {
  getAuthUserTokens,
} from "@topcoder/micro-frontends-navbar-app";

const MyTeamsDetails = ({ teamId }) => {
  const authUserTokens = useAsync(getAuthUserTokens);
  const tokenV3 = authUserTokens.value ? authUserTokens.value.tokenV3 : null;
  const [team, loadingError] = useData(getTeamById, tokenV3, teamId);

  return (
    <LayoutContainer>
      {!team ? (
        <LoadingIndicator error={loadingError && loadingError.toString()} />
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

export default MyTeamsDetails;
