import React from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";

function Radio(props) {
  return (
    <label styleName={cn("container", { horizontal: props.horizontal })}>
      <input
        styleName="radio-input"
        type={props.type}
        name={props.name}
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onChange={props.onChange}
      />
      <span styleName="custom" />
      {props.label}
    </label>
  );
}

Radio.propTypes = {
  onChange: PT.func,
  onBlur: PT.func,
  onFocus: PT.func,
  value: PT.string.isRequired,
  disabled: PT.bool,
  type: PT.string.isRequired,
  label: PT.string,
  checked: PT.bool,
  horizontal: PT.bool,
};

export default Radio;
