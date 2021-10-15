import React from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";

/**
 * The StepsIndicator component shows in what step
 * the user is right now
 * @param {*} param0
 * @returns
 */
const StepsIndicator = ({ steps, currentStep }) => {
  const currentStepIndex = steps.findIndex((item) => item.id === currentStep);
  const completionPercentage =
    100 - 100 * (currentStepIndex / (steps.length - 1));

  const progressLineStyles = {
    right:
      completionPercentage === 0
        ? completionPercentage
        : `calc(${completionPercentage}% - 24px)`,
  };

  return (
    <div styleName="steps-indicator">
      <div styleName="default-line" />
      <div styleName="progress-line" style={progressLineStyles} />
      <div styleName="dots-wrapper">
        {steps.map((step, index) => {
          const position = 100 * (index / (steps.length - 1));
          const styles = {
            left: position > 0 ? `calc(${position}% + 2px)` : `${position}%`,
          };

          const isCompleted = index <= currentStepIndex;

          return (
            <>
              <div styleName="outer-dot" style={styles} />
              <div
                styleName={cn("dot", { "dot-completed": isCompleted })}
                style={styles}
              />
              <div
                styleName={cn("step-label", { "step-completed": isCompleted })}
                style={styles}
              >
                {step.label}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

StepsIndicator.propTypes = {
  steps: PT.arrayOf(
    PT.shape({
      id: PT.string,
      lable: PT.string,
    })
  ),
  currentStep: PT.string,
};

export default StepsIndicator;
