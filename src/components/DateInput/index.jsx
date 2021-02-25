/**
 * DateInput
 *
 * Date Input control.
 */
import React from "react";
import PT from "prop-types";
import DatePicker from "react-datepicker";
import cn from "classnames";
import "./styles.module.scss";

const DateInput = (props) => {
  return (
    <div styleName={cn("datepicker-wrapper", props.className)}>
      <DatePicker
        dateFormat="MM/dd/yyyy"
        placeholderText={props.placeholder}
        selected={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onCalendarClose={props.onBlur}
        onFocus={props.onFocus}
      />
    </div>
  );
};

DateInput.propTypes = {
  value: PT.string,
  onChange: PT.func.isRequired,
  placeholder: PT.string,
  onBlur: PT.func,
  onFocus: PT.func,
  className: PT.string,
};

export default DateInput;
