/**
 * InputContainer
 *
 * A container component for the different
 * input pages. Contains logic and supporting
 * components for selecting for roles.
 */
import React from "react";
import PT from "prop-types";
import AddedRolesAccordion from "../AddedRolesAccordion";
import Progress from "../Progress";
import "./styles.module.scss";

function InputContainer({
  stages,
  isProgressDisabled,
  toRender,
  search,
  onClick,
  progressStyle,
  addedRoles,
}) {
  return (
    <div styleName="page">
      {toRender(search)}
      <div styleName="right-side">
        <AddedRolesAccordion addedRoles={addedRoles} />
        <Progress
          isDisabled={isProgressDisabled}
          onClick={onClick ? onClick : search}
          extraStyleName={progressStyle}
          buttonLabel="Search"
          stages={stages}
          percentage="26"
        />
      </div>
    </div>
  );
}

InputContainer.propTypes = {
  stages: PT.array,
  isProgressDisabled: PT.bool,
  search: PT.func,
  onClick: PT.func,
  toRender: PT.func,
  progressStyle: PT.string,
  addedRoles: PT.array,
};

export default InputContainer;
