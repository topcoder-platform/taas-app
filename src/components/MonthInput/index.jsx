/**
 * MonthInput
 *
 * Month Input control.
 */
import React from "react";
import PT from "prop-types";
import DatePicker from "react-datepicker";
import cn from "classnames";
import "./styles.module.scss";
import IconCalendar from "../../assets/images/icon-calendar.svg";

const MonthInput = (props) => {
  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <div styleName="input-container" onClick={props.onClick}>
        <label  ref={ref}>
          {props.value}
        </label>
        <IconCalendar onClick={props.onClick} styleName='cal-icon'/>
      </div>
    );
  });

  return (
    <div styleName="container">
      <DatePicker
        selected={props.value}
        onChange={props.onChange}
        minDate={new Date()}
        popperPlacement="top-end"
        dateFormat="MMM,yyyy"
        showMonthYearPicker
        // isClearable
        showFourColumnMonthYearPicker
        customInput={<CustomInput />}
      />
    </div>
  );
};

MonthInput.propTypes = {
  value: PT.string,
  onChange: PT.func.isRequired,
  disabled: PT.bool,
  placeholder: PT.string,
  onBlur: PT.func,
  onFocus: PT.func,
  className: PT.string,
};

export default MonthInput;
