/**
 * SearchContainer
 *
 * A container component for the different
 * search pages. Contains logic and supporting
 * components for searching for roles.
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import AddedRolesAccordion from "../AddedRolesAccordion";
import Completeness from "../Completeness";
import SearchCard from "../SearchCard";
import ResultCard from "../ResultCard";
import NoMatchingProfilesResultCard from "../NoMatchingProfilesResultCard";
import { isCustomRole } from "utils/helpers";
import AddAnotherModal from "../AddAnotherModal";
import "./styles.module.scss";

function SearchContainer({
  stages,
  completenessStyle,
  navigate,
  addedRoles,
  searchState,
  matchingRole,
}) {
  const [addAnotherOpen, setAddAnotherOpen] = useState(false);

  const onSubmit = useCallback(() => {
    setAddAnotherOpen(false);
    navigate("../result");
  }, [navigate]);

  const addAnother = useCallback(() => {
    navigate("/taas/createnewteam");
  }, [navigate]);

  const renderLeftSide = () => {
    if (searchState === "searching") return <SearchCard />;
    if (!isCustomRole(matchingRole)) return <ResultCard role={matchingRole} />;
    return <NoMatchingProfilesResultCard role={matchingRole} />;
  };

  const getPercentage = useCallback(() => {
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
            searchState === "searching" ||
            (searchState === "done" && (!addedRoles || !addedRoles.length))
          }
          onClick={() => setAddAnotherOpen(true)}
          extraStyleName={completenessStyle}
          buttonLabel="Submit Request"
          stages={stages}
          percentage={getPercentage()}
        />
      </div>
      <AddAnotherModal
        open={addAnotherOpen}
        onClose={() => setAddAnotherOpen(false)}
        submitDone={true}
        onContinueClick={onSubmit}
        addAnother={addAnother}
      />
    </div>
  );
}

SearchContainer.propTypes = {
  stages: PT.array,
  completenessStyle: PT.string,
  navigate: PT.func,
  addedRoles: PT.array,
  searchState: PT.string,
  matchingRole: PT.object,
};

export default SearchContainer;
