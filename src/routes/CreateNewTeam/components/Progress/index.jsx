/**
 * Progress Sidebar
 * Shows level of progress through skill
 * input process and contains a button for
 * searching for users or submitting the job.
 */
import Button from "components/Button";
import React from "react";
import cn from "classnames";
import PT from "prop-types";
import Spinner from "components/CenteredSpinner";
import ProgressBar from "../ProgressBar";
import "./styles.module.scss";
function Progress({
  extraStyleName,
  isDisabled,
  isSearching,
  onClick,
  buttonLabel,
  stages,
  percentage,
}) {
  return (
    <div styleName={cn("progress", extraStyleName)}>
      <ProgressBar percentDone={percentage} />
      <ul styleName="list">
        {stages.map((stage, idx) => (
          <li
            styleName={cn("list-item", {
              active: stage.isCurrent,
              done: stage.completed,
            })}
            data-index={idx + 1}
          >
            {stage.name}
          </li>
        ))}
      </ul>
      {buttonLabel !== undefined ? (
        <Button
          styleName={cn({ searching: isSearching })}
          size="medium"
          type="secondary"
          disabled={isDisabled}
          onClick={onClick}
        >
          {isSearching ? (
            <>
              <div styleName="spinner">
                <Spinner stype="Oval" width="16" height="16" />
              </div>
              Searching
            </>
          ) : (
            buttonLabel
          )}
        </Button>
      ) : null}
    </div>
  );
}

Progress.propTypes = {
  extraStyleName: PT.string,
  isDisabled: PT.bool,
  isSearching: PT.bool,
  onClick: PT.func,
  buttonLabel: PT.string,
  currentStageIdx: PT.number,
  stages: PT.arrayOf(PT.string),
};

export default Progress;
