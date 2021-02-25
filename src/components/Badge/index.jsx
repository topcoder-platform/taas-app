/**
 * Badge
 *
 * - type - see BADGE_TYPE values
 *
 */
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import { BADGE_TYPE } from "constants";
import "./styles.module.scss";

const Badge = ({ children, type = BADGE_TYPE.PRIMARY }) => {
  return <span styleName={cn("badge", `type-${type}`)}>{children}</span>;
};

Badge.propTypes = {
  children: PT.node,
  type: PT.oneOf(Object.values(BADGE_TYPE)),
};

export default Badge;
