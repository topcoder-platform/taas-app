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
import IconListQuill from "../../assets/images/icon-list-quill.svg";

function Completeness({ title, backgroundIcon, isDisabled, backgroundImage, onClick, buttonLabel, stage }) {
  return (
    <div styleName="completeness"
      style={{
        backgroundImage,
      }}
    >
      <CompleteProgress
        percentDone={stage === 1 ? 26 : stage === 2 ? 52 : 98}
      />
      <ul styleName="list">
        <li
          styleName={cn(
            "list-item",
            { active: stage === 1 },
            { done: stage > 1 }
          )}
        >
          Input {title}
        </li>
        <li
          styleName={cn(
            "list-item",
            { active: stage === 2 },
            { done: stage === 3 }
          )}
        >
          Search Member
        </li>
        <li styleName={cn("list-item", { active: stage === 3 })}>
          Overview of the Results
        </li>
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
  isDisabled: PT.bool,
  onClick: PT.func,
  buttonLabel: PT.string,
  stage: PT.number,
  title: PT.string,
  backgroundImage: PT.string,
  backgroundIcon: PT.string
};

export default Completeness;
