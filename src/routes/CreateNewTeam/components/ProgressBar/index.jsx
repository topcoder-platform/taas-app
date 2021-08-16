/**
 * Progress Tracker
 * Graphical representation of
 * progress percentage for skill input.
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

function ProgressBar({ percentDone }) {
  if (!percentDone || percentDone < 0) {
    percentDone = 0;
  } else if (percentDone > 100) {
    percentDone = 100;
  }

  return (
    <div styleName="progress">
      <div styleName="heading">
        <p>Completeness</p>
        <h6>{percentDone}%</h6>
      </div>
      <div styleName="progress-bar">
        <div
          styleName="progress-bar-fill"
          style={{ width: `${percentDone}%` }}
        />
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  percentDone: PT.number,
};

export default ProgressBar;
