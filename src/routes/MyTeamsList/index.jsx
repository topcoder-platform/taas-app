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

const MyTeamsList = () => {
  const [myTeams, loadingError] = useData(getMyTeams);

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
