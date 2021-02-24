/**
 * AsyncSelect
 *
 * A wrapper for react-select's AsyncCreatableSelect.
 */
import React from "react";
import PT from "prop-types";
import AsyncCreatableSelect from "react-select/async-creatable";
import "./styles.module.scss";

const AsyncSelect = (props) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "40px",
      border: "1px solid #aaaaab",
      borderColor: state.isFocused ? "#55a5ff" : "#aaaaab",
      boxShadow: state.isFocused ? "0 0 2px 1px #cee6ff" : provided.boxShadow,
    }),
    menu: (provided) => ({
      ...provided,
      minHeight: "40px",
      zIndex: 10,
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "2px 6px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
      height: "auto",
      padding: "0",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "auto",
    }),
    option: (provided) => ({
      ...provided,
      minHeight: "32px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#AAAAAA",
      fontFamily: "Roboto",
      fontSize: "14px",
      lineHeight: "22px",
      textAlign: "left",
      fontWeight: "400",
    }),
    multiValue: (provided) => ({
      ...provided,
      margin: "3px 3px",
      color: "#AAAAAA",
      fontFamily: "Roboto",
      fontSize: "14px",
      lineHeight: "22px",
      textAlign: "left",
      borderRadius: "5px",
    }),
    dropdownIndicator: () => ({
      display: "none",
    }),
  };

  return (
    <div styleName="select-wrapper">
      <AsyncCreatableSelect
        value={props.value}
        styles={customStyles}
        onChange={props.onChange}
        styleName={props.error ? "error" : ""}
        isMulti={props.isMulti}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        onInputChange={props.onInputChange}
        noOptionsMessage={() => props.noOptionsText}
        loadingMessage={() => props.loadingText}
        isDisabled={props.disabled}
        cacheOptions={props.cacheOptions}
        loadOptions={props.loadOptions}
        defaultOptions={props.defaultOptions}
      />
    </div>
  )
}

AsyncSelect.propTypes = {
  value: PT.string,
  onChange: PT.func,
  placeholder: PT.string,
  error: PT.string,
  isMulti: PT.bool,
  onBlur: PT.func,
  onFocus: PT.func,
  onInputChange: PT.func,
  cacheOptions: PT.bool,
  onInputChange: PT.func,
  noOptionsText: PT.string,
  loadingText: PT.string,
  loadOptions: PT.func,
  defaultOptions: PT.bool || PT.array,
  disabled: PT.bool,
}

export default AsyncSelect;