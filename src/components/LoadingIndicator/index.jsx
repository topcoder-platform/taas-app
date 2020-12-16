/**
 * LoadingIndicator
 *
 * Optionally shows error.
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

const LoadingIndicator = ({ error }) => {
  return (
    <div styleName="loading-indicator">{!error ? "Loading..." : error}</div>
  );
};

LoadingIndicator.propTypes = {
  error: PT.string,
};

export default LoadingIndicator;
