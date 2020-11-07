/**
 * Button
 *
 * Supports:
 * - size - see BUTTON_SIZE values
 * - type - see BUTTON_TYPE values
 */
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import { BUTTON_SIZE, BUTTON_TYPE } from "constants";
import "./styles.module.scss";

const Button = ({
  children,
  size = BUTTON_SIZE.SMALL,
  type = BUTTON_TYPE.PRIMARY,
  onClick,
  className,
  innerRef,
  disabled,
}) => {
  return (
    <button
      styleName={cn("button", `type-${type}`, `size-${size}`)}
      onClick={onClick}
      className={className}
      ref={innerRef}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PT.node,
  size: PT.oneOf(Object.values(BUTTON_SIZE)),
  type: PT.oneOf(Object.values(BUTTON_TYPE)),
  onClick: PT.func,
  className: PT.string,
  innerRef: PT.func,
  disabled: PT.bool,
};

export default Button;
