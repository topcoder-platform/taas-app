/**
 * TeamCardGrid
 *
 * Implements a grid for TeamCards.
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

const TeamCardGrid = ({ children }) => {
  return <div styleName="team-card-grid">{children}</div>;
};

TeamCardGrid.propTypes = {
  children: PT.node,
};

export default TeamCardGrid;
