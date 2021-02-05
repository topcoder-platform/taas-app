/**
 * ReactSelect
 *
 * A wrapper of react select control.
 */
import React from "react";
import PT from "prop-types";
import Select from "react-select";
import "./styles.module.scss";

const ReactSelect = (props) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "36px",
      borderColor: state.isFocused ? "#55a5ff" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 2px 1px #cee6ff" : provided.boxShadow
    }),
    menu: (provided) => ({
      ...provided,
      minHeight: "36px",
      zIndex: 10,
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "1px 6px",
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
      minHeight: "32px"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#AAAAAA",
      fontFamily: "Roboto",
      fontSize: "16px",
      lineHeight: "22px",
      textAlign: "left",
      fontWeight: "300"
    }),
    multiValue: (provided) => ({
      ...provided,
      margin: "4px 4px",
      color: "#AAAAAA",
      fontFamily: "Roboto",
      fontSize: "14px",
      lineHeight: "22px",
      textAlign: "left",
      borderRadius: "5px"
    })
  };

  return (
    <div styleName="select-wrapper">
      <Select
        value={props.value}
        styles={customStyles}
        onChange={(val) => {
          props.onChange(val);
        }}
        options={props.options}
        styleName={props.error ? "error" : ""}
        isMulti={props.isMulti}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
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
  onBlur: PT.func,
  onFocus: PT.func,
  options: PT.arrayOf(
    PT.shape({
      value: PT.string.isRequired,
      label: PT.string.isRequired,
    }).isRequired
  ),
};

export default ReactSelect;
