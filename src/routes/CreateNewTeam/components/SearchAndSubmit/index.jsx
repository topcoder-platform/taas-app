import { Router } from "@reach/router";
import _ from "lodash";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchRoles } from "services/teams";
import { isCustomRole, setCurrentStage } from "utils/helpers";
import { addRoleSearchId, addSearchedRole } from "../../actions";
import SearchContainer from "../SearchContainer";
import SubmitContainer from "../SubmitContainer";

function SearchAndSubmit(props) {
  const { stages, setStages, searchObject, onClick } = props;

  const [searchState, setSearchState] = useState(null);
  const [matchingRole, setMatchingRole] = useState(null);

  const { addedRoles, previousSearchId } = useSelector(
    (state) => state.searchedRoles
  );

  const dispatch = useDispatch();

  const search = useCallback(() => {
    setCurrentStage(1, stages, setStages);
    setSearchState("searching");
    setMatchingRole(null);
    const searchObjectCopy = { ...searchObject };
    if (previousSearchId) {
      searchObjectCopy.previousRoleSearchRequestId = previousSearchId;
    }
    searchRoles(searchObjectCopy)
      .then((res) => {
        const name = _.get(res, "data.name");
        const searchId = _.get(res, "data.roleSearchRequestId");
        if (name && !isCustomRole({ name })) {
          dispatch(addSearchedRole({ searchId, name }));
        } else if (searchId) {
          dispatch(addRoleSearchId(searchId));
        }
        setMatchingRole(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setCurrentStage(2, stages, setStages);
        setSearchState("done");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, previousSearchId, searchObject]);

  return (
    <Router>
      <SearchContainer
        path="/"
        addedRoles={addedRoles}
        previousSearchId={previousSearchId}
        search={search}
        searchState={searchState}
        matchingRole={matchingRole}
        {...props}
      />
      <SubmitContainer
        path="result"
        addedRoles={addedRoles}
        matchingRole={matchingRole}
        {...props}
      />
    </Router>
  );
}

export default SearchAndSubmit;
