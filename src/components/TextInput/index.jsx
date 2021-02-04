/**
 * TextInput
 *
 * A wrapper of TextInput control.
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

function TextInput(props) {
  return (
    <input
      styleName={`TextInput ${props.className} ${
        props.readonly ? "readonly" : ""
      }`}
      maxLength={props.maxLength}
      min={props.minValue}
      onChange={(event) => {
        if (props.type === "number") {
          if (event.target.value >= props.minValue) {
            props.onChange(event.target.value);
          } else {
            props.onChange(props.minValue);
          }
        } else {
          props.onChange(event.target.value);
        }
      }}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value}
      autoFocus={props.autoFocus}
      readOnly={props.readonly ?? false}
    />
  );
}

TextInput.defaultProps = {
  className: "",
  maxLength: Number.MAX_VALUE,
  placeholder: "",
  minValue: 0,
};

TextInput.propTypes = {
  className: PT.string,
  maxLength: PT.number,
  onChange: PT.func,
  placeholder: PT.string,
  value: PT.string.isRequired,
  type: PT.string.isRequired,
  readonly: PT.bool,
  minValue: PT.number,
};

export default TextInput;
