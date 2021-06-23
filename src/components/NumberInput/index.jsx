/**
 * Number Input
 * A custom number input to be used in forms
 * Removed default buttons and adds custom buttons
 */
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";

function NumberInput({ name, value, onChange, onBlur, onFocus, min, error }) {
  const incrementVal = (step) => {
    const newVal = +value + step;
    if (typeof newVal === "number" && !isNaN(newVal)) {
      onChange(newVal);
    }
  };
  const decrementVal = (step) => {
    const newVal = value - step;
    if (newVal >= min) {
      onChange(value - step);
    }
  };

  return (
    <div styleName="container">
      <button styleName="left-button" onClick={() => decrementVal(1)}>
        –
      </button>
      <input
        styleName={cn("input", { error: error })}
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <button styleName="right-button" onClick={() => incrementVal(1)}>
        +
      </button>
    </div>
  );
}

NumberInput.propTypes = {
  name: PT.string,
  value: PT.string,
  onChange: PT.func,
  onFocus: PT.func,
  onBlur: PT.func,
  min: PT.string,
  error: PT.bool,
};

export default NumberInput;
