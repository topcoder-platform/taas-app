/**
 * InputContainer
 *
 * A container component for the different
 * input pages. Contains logic and supporting
 * components for selecting for roles.
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

function InputContainer({
  stages,
  isCompletenessDisabled,
  toRender,
  search,
  onClick,
  completenessStyle,
  addedRoles,
}) {
  return (
    <div styleName="page">
      {toRender(search)}
      <div styleName="right-side">
        <AddedRolesAccordion addedRoles={addedRoles} />
        <Completeness
          isDisabled={isCompletenessDisabled}
          onClick={onClick ? onClick: search}
          extraStyleName={completenessStyle}
          buttonLabel={"Search"}
          stages={stages}
          percentage="26"
        />
      </div>
    </div>
  );
}

InputContainer.propTypes = {
  stages: PT.array,
  isCompletenessDisabled: PT.bool,
  search: PT.func,
  onClick: PT.func,
  toRender: PT.func,
  completenessStyle: PT.string,
  addedRoles: PT.array,
};

export default InputContainer;
