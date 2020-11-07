/**
 * Input
 *
 * General purpose one-line text input.
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

const Input = ({ type = "text", value, onChange, placeholder, className }) => {
  return (
    <input
      styleName="input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

Input.propTypes = {
  type: PT.string,
  value: PT.string,
  onChange: PT.func,
  placeholder: PT.string,
  className: PT.string,
};

export default Input;
