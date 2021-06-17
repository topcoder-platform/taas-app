/**
 * SearchContainer
 *
 * A container component for the different
 * search pages. Contains logic and supporting
 * components for searching for roles.
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import _ from "lodash";
import { useDispatch } from "react-redux";
import AddedRolesAccordion from "../AddedRolesAccordion";
import Completeness from "../Completeness";
import SearchCard from "../SearchCard";
import ResultCard from "../ResultCard";
import NoMatchingProfilesResultCard from "../NoMatchingProfilesResultCard";
import { searchRoles } from "services/teams";
import { setCurrentStage } from "utils/helpers";
import { addRoleSearchId, addSearchedRole } from "../../actions";
import { CUSTOM_ROLE_NAMES } from "constants";
import "./styles.module.scss";

function SearchContainer({
  stages,
  setStages,
  isCompletenessDisabled,
  toRender,
  searchObject,
  completenessStyle,
  navigate,
  addedRoles,
  previousSearchId,
}) {
  const [searchState, setSearchState] = useState(null);
  const [matchingRole, setMatchingRole] = useState(null);

  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    navigate("result", { state: { matchingRole } });
  }, [navigate, matchingRole]);

  const search = () => {
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
        if (name && !CUSTOM_ROLE_NAMES.includes(name.toLowerCase())) {
          setMatchingRole(res.data);
          dispatch(addSearchedRole({ searchId, name }));
        } else if (searchId) {
          dispatch(addRoleSearchId(searchId));
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setCurrentStage(2, stages, setStages);
        setSearchState("done");
      });
  };

  const renderLeftSide = () => {
    if (!searchState) return toRender;
    if (searchState === "searching") return <SearchCard />;
    if (matchingRole) return <ResultCard role={matchingRole} />;
    return <NoMatchingProfilesResultCard />;
  };

  const getPercentage = useCallback(() => {
    if (!searchState) return "26";
    if (searchState === "searching") return "52";
    if (matchingRole) return "98";
    return "88";
  }, [searchState, matchingRole]);

  return (
    <div styleName="page">
      {renderLeftSide()}
      <div styleName="right-side">
        <AddedRolesAccordion addedRoles={addedRoles} />
        <Completeness
          isDisabled={
            isCompletenessDisabled ||
            searchState === "searching" ||
            (searchState === "done" && !matchingRole)
          }
          onClick={searchState ? onSubmit : search}
          extraStyleName={completenessStyle}
          buttonLabel={searchState ? "Submit Request" : "Search"}
          stages={stages}
          percentage={getPercentage()}
        />
      </div>
    </div>
  );
}

SearchContainer.propTypes = {
  stages: PT.array,
  setStages: PT.func,
  isCompletenessDisabled: PT.bool,
  searchObject: PT.object,
  toRender: PT.node,
  completenessStyle: PT.string,
  navigate: PT.func,
  addedRoles: PT.array,
  previousSearchId: PT.string,
};

export default SearchContainer;
