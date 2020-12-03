/**
 * MyTeamsList
 *
 * Page for the list of teams.
 */
import React from "react";
import LayoutContainer from "components/LayoutContainer";
import PageHeader from "components/PageHeader";
import { useData } from "../../hooks/useData";
import { getMyTeams } from "../../services/teams";
import TeamCard from "./components/TeamCard";
import TeamCardGrid from "./components/TeamCardGrid";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useAsync } from "react-use";
import {
  getAuthUserTokens,
} from "@topcoder/micro-frontends-navbar-app";

const MyTeamsList = () => {
  const authUserTokens = useAsync(getAuthUserTokens);
  const tokenV3 = authUserTokens.value ? authUserTokens.value.tokenV3 : null;
  const [myTeams, loadingError] = useData(getMyTeams, tokenV3);

  return (
    <LayoutContainer>
      <PageHeader title="My Teams" />
      {!myTeams ? (
        <LoadingIndicator error={loadingError && loadingError.toString()} />
      ) : (
        <TeamCardGrid>
          {myTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </TeamCardGrid>
      )}
    </LayoutContainer>
  );
};

export default MyTeamsList;
