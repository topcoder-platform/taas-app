import { Router, navigate } from "@reach/router";
import _ from "lodash";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "hooks/useData";
import { getSkills } from "services/skills";
import { searchRoles } from "services/teams";
import { isCustomRole, setCurrentStage } from "utils/helpers";
import {
  clearMatchingRole,
  saveMatchingRole,
  addRoleSearchId,
  addSearchedRole,
} from "../../actions";
import InputContainer from "../InputContainer";
import SearchContainer from "../SearchContainer";
import SubmitContainer from "../SubmitContainer";

const SEARCHINGTIME = 1600;

function SearchAndSubmit(props) {
  const { stages, setStages, searchObject, onClick, page } = props;

  const [searchState, setSearchState] = useState(null);
  const [isNewRole, setIsNewRole] = useState(false);
  const [skills] = useData(getSkills);
  const { matchingRole } = useSelector((state) => state.searchedRoles);

  const matchedSkills = useMemo(() => {
    if (
      skills &&
      matchingRole &&
      matchingRole.matchedSkills
    ) {
      return _.map(matchingRole.matchedSkills, (s) =>
        _.find(skills, (skill) => skill.name === s)
      );
    } else {
      return [];
    }
  }, [skills, matchingRole]);

  const unMatchedSkills = useMemo(() => {
    if (
      skills &&
      matchingRole &&
      matchingRole.unMatchedSkills
    ) {
      return _.map(matchingRole.unMatchedSkills, (s) =>
        _.find(skills, (skill) => skill.name === s)
      );
    } else {
      return [];
    }
  }, [skills, matchingRole]);
  useEffect(() => {
    const isFromInputPage =
      searchObject.role ||
      (searchObject.skills && searchObject.skills.length) ||
      searchObject.jobDescription;
    // refresh in search page directly
    if (matchingRole && !isFromInputPage) {
      setCurrentStage(2, stages, setStages);
      setSearchState("done");
    }
  }, []);

  const dispatch = useDispatch();

  const { addedRoles, previousSearchId } = useSelector(
    (state) => state.searchedRoles
  );

  const search = useCallback(() => {
    navigate(`${page}/search`);
    setCurrentStage(1, stages, setStages);
    setSearchState("searching");
    dispatch(clearMatchingRole());
    const searchObjectCopy = { ...searchObject };
    if (previousSearchId) {
      searchObjectCopy.previousRoleSearchRequestId = previousSearchId;
    }
    const searchingBegin = Date.now();
    searchRoles(searchObjectCopy)
      .then((res) => {
        const name = _.get(res, "data.name");
        const searchId = _.get(res, "data.roleSearchRequestId");
        if (name && !isCustomRole({ name })) {
          dispatch(
            addSearchedRole({
              searchId,
              name,
              numberOfResources: 1,
              durationWeeks: 4,
            })
          );
          setIsNewRole(true);
        } else if (searchId) {
          dispatch(addRoleSearchId(searchId));
        }
        dispatch(saveMatchingRole(res.data));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        _.delay(
          () => {
            setCurrentStage(2, stages, setStages);
            setSearchState("done");
          },
          Date.now() - searchingBegin > SEARCHINGTIME ? 0 : 1500
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, previousSearchId, searchObject]);

  return (
    <Router>
      <InputContainer
        path="/"
        addedRoles={addedRoles}
        previousSearchId={previousSearchId}
        search={search}
        {...props}
      />
      <SearchContainer
        path="search"
        previousSearchId={previousSearchId}
        addedRoles={addedRoles}
        matchedSkills={matchedSkills}
        unMatchedSkills={unMatchedSkills}
        searchState={searchState}
        matchingRole={matchingRole}
        isNewRole={isNewRole}
        {...props}
      />
      <SubmitContainer
        path="result"
        matchedSkills={matchedSkills}
        unMatchedSkills={unMatchedSkills}
        addedRoles={addedRoles}
        previousSearchId={previousSearchId}
        matchingRole={matchingRole}
        {...props}
      />
    </Router>
  );
}

export default SearchAndSubmit;
