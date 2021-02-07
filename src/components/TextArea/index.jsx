/**
 * TextArea
 *
 * A wrapper of TextArea control.
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

function TextArea(props) {
  return (
    <textarea
      auto
      className={`TextArea ${props.className} ${props.value ? "" : "empty"}`}
      onChange={(event) => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      value={props.value}
      autoFocus={props.autoFocus}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
    />
  );
}

TextArea.defaultProps = {
  className: "",
  placeholder: "",
};

TextArea.propTypes = {
  className: PT.string,
  maxLength: PT.number,
  onChange: PT.func,
  placeholder: PT.string,
  value: PT.string.isRequired,
  onBlur: PT.func,
  onFocus: PT.func,
};

export default TextArea;
