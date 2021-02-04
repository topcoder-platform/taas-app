/**
 * ReactSelect
 *
 * A wrapper of react select control.
 */
import React from "react";
import PT from "prop-types";
import Select from "react-select";
import "./styles.module.scss";

const ReactSelect = ({
  value,
  onChange,
  placeholder,
  error,
  isMulti,
  options,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "36px",
    }),
    menu: (provided, state) => ({
      ...provided,
      minHeight: "36px",
      zIndex: 10,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: "0 6px",
    }),
    input: (provided, state) => ({
      ...provided,
      margin: "0px",
      height: "36px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "40px",
    }),
  };

  return (
    <div styleName="select-wrapper">
      <Select
        value={value}
        styles={customStyles}
        onChange={(val) => {
          onChange(val);
        }}
        options={options}
        styleName={error ? "error" : ""}
        isMulti={isMulti}
      />
    </div>
  );
};

ReactSelect.propTypes = {
  value: PT.string.isRequired,
  onChange: PT.func.isRequired,
  placeholder: PT.string,
  error: PT.string,
  isMulti: PT.bool,
  options: PT.arrayOf(
    PT.shape({
      value: PT.string.isRequired,
      label: PT.string.isRequired,
    }).isRequired
  ),
};

export default ReactSelect;
