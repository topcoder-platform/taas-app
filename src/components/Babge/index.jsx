/**
 * Babge
 *
 * - type - see BABGE_TYPE values
 *
 */
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import { BABGE_TYPE } from "constants";
import "./styles.module.scss";

const Babge = ({ children, type = BABGE_TYPE.PRIMARY }) => {
  return <span styleName={cn("babge", `type-${type}`)}>{children}</span>;
};

Babge.propTypes = {
  children: PT.node,
  type: PT.oneOf(Object.values(BABGE_TYPE)),
};

export default Babge;
