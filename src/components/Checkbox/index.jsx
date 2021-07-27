import React from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";

function Checkbox({ label, disabled, checkmarkFloat, checked, onClick }) {
  return (
    <label styleName={cn("container", { ["disabled"]: disabled })}>
      {label}
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onClick={onClick}
      />
      <span styleName={`checkmark float-${checkmarkFloat || "left"}`}></span>
    </label>
  );
}

Checkbox.propTypes = {
  label: PT.string,
  checkmarkFloat: PT.oneOf(["right", "left"]),
  disabled: PT.bool,
  checked: PT.bool,
  onClick: PT.func,
};

export default Checkbox;
