/**
 * SearchContainer
 *
 * A container component for the different
 * search pages. Contains logic and supporting
 * components for searching for roles.
 */
import React, { useCallback } from "react";
import PT from "prop-types";
import AddedRolesAccordion from "../AddedRolesAccordion";
import Completeness from "../Completeness";
import SearchCard from "../SearchCard";
import ResultCard from "../ResultCard";
import NoMatchingProfilesResultCard from "../NoMatchingProfilesResultCard";
import { isCustomRole } from "utils/helpers";
import "./styles.module.scss";

function SearchContainer({
  stages,
  isCompletenessDisabled,
  toRender,
  onClick,
  search,
  completenessStyle,
  navigate,
  addedRoles,
  searchState,
  matchingRole,
}) {
  const onSubmit = useCallback(() => {
    navigate("result");
  }, [navigate]);

  const renderLeftSide = () => {
    if (!searchState) return toRender(search);
    if (searchState === "searching") return <SearchCard />;
    if (!isCustomRole(matchingRole)) return <ResultCard role={matchingRole} />;
    return <NoMatchingProfilesResultCard role={matchingRole} />;
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
            (searchState === "done" && isCustomRole(matchingRole))
          }
          onClick={searchState ? onSubmit : onClick ? onClick : search}
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
  isCompletenessDisabled: PT.bool,
  onClick: PT.func,
  search: PT.func,
  toRender: PT.func,
  completenessStyle: PT.string,
  navigate: PT.func,
  addedRoles: PT.array,
  searchState: PT.string,
  matchingRole: PT.object,
};

export default SearchContainer;
