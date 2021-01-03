/**
 * MyTeamsList
 *
 * Page for the list of teams.
 */
import React, { useCallback, useState, useEffect } from "react";
import _ from "lodash";
import LayoutContainer from "components/LayoutContainer";
import { useDebouncedCallback } from "use-debounce";
import PageHeader from "components/PageHeader";
import Input from "components/Input";
import Pagination from "components/Pagination";
import { getMyTeams } from "../../services/teams";
import TeamCard from "./components/TeamCard";
import TeamCardGrid from "./components/TeamCardGrid";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useAsync } from "react-use";
import { TEAMS_PER_PAGE } from "constants";
import "./styles.module.scss";

const MyTeamsList = () => {
  // let [myTeams, loadingError] = useData(getMyTeams);
  let [myTeams, setMyTeams] = useState();
  const [filter, setFilter] = useState("");
  const [loadingError, setLoadingError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const onFilterChange = useDebouncedCallback((value) => {
    setFilter(value);
    setPage(1);
  }, 200);

  useEffect(() => {
    getMyTeams(filter, page, TEAMS_PER_PAGE)
      .then((response) => {
        setMyTeams(response.data);
        setTotal(response.headers["x-total"]);
      })
      .catch((responseError) => {
        setLoadingError(responseError);
      });
  }, [filter, page]);

  const onPageClick = useCallback(
    (newPage) => {
      setPage(newPage);
    },
    [setPage]
  );

  return (
    <LayoutContainer>
      <PageHeader
        title="My Teams"
        aside={
          <Input
            placeholder="Filter by team name"
            styleName="filter-input"
            onChange={(e) => onFilterChange.callback(e.target.value)}
          />
        }
      />
      {!myTeams ? (
        <LoadingIndicator error={loadingError && loadingError.toString()} />
      ) : (
        <>
          <TeamCardGrid>
            {myTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </TeamCardGrid>
          {myTeams.length > 0 && (
            <div styleName="pagination-wrapper">
              <Pagination
                total={total}
                currentPage={page}
                perPage={TEAMS_PER_PAGE}
                onPageClick={onPageClick}
              />
            </div>
          )}
        </>
      )}
    </LayoutContainer>
  );
};

export default MyTeamsList;
