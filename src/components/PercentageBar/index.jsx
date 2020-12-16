/**
 * PercentageBar
 *
 * Bar which shows percentage of some value.
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

const PercentageBar = ({ ratio, className }) => {
  return (
    <div styleName="percentage-bar" className={className}>
      <div styleName="value" style={{ width: `${ratio * 100}%` }} />
    </div>
  );
};

PercentageBar.propTypes = {
  ratio: PT.number.isRequired,
  className: PT.string,
};

export default PercentageBar;
