import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

function Checkbox({ label, checked, onClick }) {
  return (
    <label styleName="container">
      {label}
      <input type="checkbox" checked={checked} onClick={onClick} />
      <span styleName="checkmark"></span>
    </label>
  );
}

Checkbox.propTypes = {
  label: PT.string,
  checked: PT.bool,
  onClick: PT.func,
};

export default Checkbox;
