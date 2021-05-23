import Button from "components/Button";
import React from "react";
import cn from "classnames";
import CompleteProgress from "../CompleteProgress";
import "./styles.module.scss";
import IconListQuill from "../../../../assets/images/icon-list-quill.svg";

function Completeness({ isDisabled, onClick, buttonLabel, stage }) {
  return (
    <div styleName="completeness">
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
          Input Skills
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
      <IconListQuill styleName="transparent-icon" />
    </div>
  );
}

export default Completeness;
