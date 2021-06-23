/**
 * Month Picker
 * An styled input component for selecting date by month.
 * Compatible with react-final-form
 */
import React from "react";
import PT from "prop-types";
import DatePicker from "react-datepicker";
import "./styles.module.scss";

function getCurrMonthYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  return new Date(`${year}-${month + 1}`);
}

function MonthPicker({ name, value, onChange, onBlur, onFocus }) {
  return (
    <div styleName="month-picker">
      <DatePicker
        name={name}
        selected={value}
        onChange={onChange}
        dateFormat="MMM, yyyy"
        showMonthYearPicker
        showPopperArrow={false}
        onBlur={onBlur}
        onFocus={onFocus}
        popperPlacement="top-end"
        showFourColumnMonthYearPicker
        minDate={getCurrMonthYear()}
      />
    </div>
  );
}

MonthPicker.propTypes = {
  name: PT.string,
  value: PT.any,
  onChange: PT.func,
  onBlur: PT.func,
};

export default MonthPicker;
