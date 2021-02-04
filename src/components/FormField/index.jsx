/**
 * FormField
 *
 * FormField Component.
 */
import React from "react";
import PT from "prop-types";
import { Field } from "react-final-form";
import { FORM_FIELD_TYPE } from "../../constants";
import TextInput from "../../components/TextInput";
import TextArea from "../../components/TextArea";
import ReactSelect from "../../components/ReactSelect";
import DateInput from "../../components/DateInput";
import "./styles.module.scss";

const FormField = ({ field, isGroupField }) => {
  return (
    <Field name={field.name}>
      {({ input, meta }) => (
        <div styleName={isGroupField ? "field-group-field" : ""}>
          <label
            styleName={
              input.value
                ? "job-field-label"
                : "job-field-label job-field-no-label"
            }
          >
            {field.label}
          </label>
          {field.type === FORM_FIELD_TYPE.TEXT && (
            <TextInput
              maxLength={field.maxLength}
              placeholder={field.placeholder}
              value={input.value ?? ""}
              type="text"
              onChange={(v) => {
                input.onChange(v);
              }}
              className={meta.error ? "error" : ""}
              readonly={field.readonly}
            />
          )}
          {field.type === FORM_FIELD_TYPE.NUMBER && (
            <TextInput
              placeholder={field.placeholder}
              value={input?.value ?? ""}
              type="number"
              minValue={field.minValue}
              onChange={input.onChange}
              className={meta.error ? "error" : ""}
            />
          )}
          {field.type === FORM_FIELD_TYPE.TEXTAREA && (
            <TextArea
              placeholder={field.placeholder}
              value={input?.value ?? ""}
              onChange={input.onChange}
              className={meta.error ? "error" : ""}
            />
          )}
          {field.type === FORM_FIELD_TYPE.DATE && (
            <DateInput
              placeholder={field.placeholder}
              value={input?.value ?? ""}
              onChange={(date) => {
                input.onChange(date);
              }}
            />
          )}
          {field.type === FORM_FIELD_TYPE.SELECT && (
            <ReactSelect
              value={input?.value ?? ""}
              onChange={(val) => {
                input.onChange(val);
              }}
              options={field.selectOptions}
              isMulti={field.isMulti}
            />
          )}
          {field.isRequired && meta.error && (
            <div styleName="field-error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};

FormField.prototype = {
  fields: PT.arrayOf(
    PT.shape({
      label: PT.string,
      type: PT.oneOf(Object.values(FORM_FIELD_TYPE)).isRequired,
      isRequired: PT.bool,
      validationMessage: PT.string,
      name: PT.string.isRequired,
      component: PT.element,
      selectOptions: PT.arrayOf(
        PT.shape({
          value: PT.string.isRequired,
          label: PT.string.isRequired,
        })
      ),
      minValue: PT.number,
      maxLength: PT.number,
      styleName: PT.string,
      readonly: PT.string,
    })
  ).isRequired,
  isGroupField: PT.bool,
};

export default FormField;
