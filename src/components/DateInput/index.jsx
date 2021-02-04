/**
 * DateInput
 *
 * Date Input control.
 */
import React from "react";
import PT from "prop-types";
import DatePicker from "react-datepicker";
import "./styles.module.scss";

const DateInput = ({ value, onChange, placeholder }) => {
  return (
    <div styleName="datepicker-wrapper">
      <DatePicker
        dateFormat="MM/dd/yyyy"
        placeholderText={placeholder}
        selected={value}
        onChange={onChange}
      />
    </div>
  );
};

DateInput.propTypes = {
  value: PT.string,
  onChange: PT.func.isRequired,
  placeholder: PT.string,
};

export default DateInput;
