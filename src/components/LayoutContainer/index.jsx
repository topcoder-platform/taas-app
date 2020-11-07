/**
 * LayoutContainer
 *
 * Common container for pages.
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

const LayoutContainer = ({ children }) => {
  return <div styleName="container">{children}</div>;
};

LayoutContainer.propTypes = {
  children: PT.node,
};

export default LayoutContainer;
