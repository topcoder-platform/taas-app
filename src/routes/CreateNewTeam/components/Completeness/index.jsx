/**
 * Completeness Sidebar
 * Shows level of completeness through skill
 * input process and contains a button for
 * searching for users or submitting the job.
 */
import Button from "components/Button";
import React from "react";
import cn from "classnames";
import PT from "prop-types";
import CompleteProgress from "../CompleteProgress";
import "./styles.module.scss";
import IconMultipleActionsCheck from "../../../../assets/images/icon-multiple-actions-check-2.svg";
import IconListQuill from "../../../../assets/images/icon-list-quill.svg";
import IconOfficeFileText from "../../../../assets/images/icon-office-file-text.svg";

function Completeness({
  extraStyleName,
  isDisabled,
  onClick,
  buttonLabel,
  stages,
  percentage,
}) {

  let backgroundIcon 
  if (extraStyleName === "input-skills") {
     backgroundIcon= <IconListQuill styleName="transparent-icon" />
  } else if (extraStyleName === "input-job-description") {
     backgroundIcon= <IconOfficeFileText styleName="transparent-icon" />
  } else {
     backgroundIcon= <IconMultipleActionsCheck styleName="transparent-icon" />
  }

  return (
    <div styleName={cn("completeness", extraStyleName)}>
      <CompleteProgress percentDone={percentage} />
      <ul styleName="list">
        {stages.map((stage) => (
          <li
            styleName={cn("list-item", {
              active: stage.isCurrent,
              done: stage.completed,
            })}
          >
            {stage.name}
          </li>
        ))}
      </ul>
      <Button
        size="medium"
        type="secondary"
        disabled={isDisabled}
        onClick={onClick}
      >
        {buttonLabel}
      </Button>
      {backgroundIcon}
    </div>
  );
}

Completeness.propTypes = {
  extraStyleName: PT.string,
  isDisabled: PT.bool,
  onClick: PT.func,
  buttonLabel: PT.string,
  currentStageIdx: PT.number,
  stages: PT.arrayOf(PT.string),
};

export default Completeness;