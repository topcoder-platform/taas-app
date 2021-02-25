/**
 * MyTeamsList
 *
 * Page for the list of teams.
 */
import React, { useCallback, useState, useEffect } from "react";
import _ from "lodash";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Input from "components/Input";
import Pagination from "components/Pagination";
import { getMyTeams } from "../../services/teams";
import TeamCard from "./components/TeamCard";
import TeamCardGrid from "./components/TeamCardGrid";
import LoadingIndicator from "../../components/LoadingIndicator";
import withAuthentication from "../../hoc/withAuthentication";
import { useDebounce } from "react-use";
import { TEAMS_PER_PAGE } from "constants";
import "./styles.module.scss";
import { INPUT_DEBOUNCE_DELAY } from "constants/";
import ReportPopup from "components/ReportPopup";

const MyTeamsList = () => {
  let [myTeams, setMyTeams] = useState(null);
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [filter, setFilter] = React.useState("");
  const [loadingError, setLoadingError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const onFilterChange = (evt) => {
    setFilter(evt.target.value);
  };

  useDebounce(
    () => {
      setDebouncedFilter(filter);
      setPage(1);
    },
    INPUT_DEBOUNCE_DELAY,
    [filter]
  );

  useEffect(() => {
    setMyTeams(null);
    getMyTeams(debouncedFilter, page, TEAMS_PER_PAGE)
      .then((response) => {
        setMyTeams(response.data);
        setTotal(response.headers["x-total"]);
      })
      .catch((responseError) => {
        setLoadingError(responseError);
      });
  }, [debouncedFilter, page]);

  const onPageClick = useCallback(
    (newPage) => {
      setPage(newPage);
    },
    [setPage]
  );

  return (
    <Page title="My Teams">
      <PageHeader
        title="My Teams"
        aside={
          <Input
            placeholder="Filter by team name"
            styleName="filter-input"
            onChange={onFilterChange}
          />
        }
      />
      {myTeams && myTeams.length === 0 && (
        <div styleName="empty">No teams found</div>
      )}
      {!myTeams ? (
        <LoadingIndicator error={loadingError} />
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
      <ReportPopup />
    </Page>
  );
};

export default withAuthentication(MyTeamsList);
