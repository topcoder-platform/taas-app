import React, { useCallback } from "react";
import cn from "classnames";
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
      <select
        value={value}
        onChange={onChangeHandler}
        styleName={cn("select", {
          "empty-value": value === "",
        })}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
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
      disabled: PT.bool,
    })
  ),
  value: PT.oneOfType([PT.string, PT.number]),
  onChange: PT.func,
};

export default Select;
