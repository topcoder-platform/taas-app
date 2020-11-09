import React, { useCallback } from "react";
import PT from "prop-types";
import "./styles.module.scss";

const Select = ({ options, value, onChange, label, className }) => {
  const onChangeHandler = useCallback(
    (event) => {
      onChange && onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <div styleName="select-wrapper" className={className}>
      {!!label && <label styleName="select-label">{label}</label>}
      <select value={value} onChange={onChangeHandler} styleName="select">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  options: PT.arrayOf(
    PT.shape({
      label: PT.string.isRequired,
      value: PT.oneOfType([PT.string, PT.number]),
    })
  ),
  value: PT.oneOfType([PT.string, PT.number]),
  onChange: PT.func,
};

export default Select;
