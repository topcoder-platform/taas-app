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
import MarkdownEditor from "../../components/MarkdownEditor";
import ReactSelect from "../../components/ReactSelect";
import DateInput from "../../components/DateInput";
import "./styles.module.scss";

const FormField = ({ field }) => {
  return (
    <Field name={field.name}>
      {({ input, meta }) => (
        <div>
          {!field.readonly && (
            <label
              styleName={
                (input.value != "undefined" &&
                  input.value !== null &&
                  input.value !== "") ||
                meta.active
                  ? "job-field-label"
                  : "job-field-label job-field-no-label"
              }
            >
              {field.label}
            </label>
          )}
          {field.type === FORM_FIELD_TYPE.TEXT && (
            <TextInput
              maxLength={field.maxLength}
              placeholder={field.placeholder}
              value={input.value ?? ""}
              type="text"
              className={meta.error && meta.touched ? "error" : ""}
              readonly={field.readonly}
              onChange={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
            />
          )}
          {field.type === FORM_FIELD_TYPE.NUMBER && (
            <TextInput
              placeholder={field.placeholder}
              value={input?.value ?? ""}
              isRequired={field.isRequired}
              type="number"
              minValue={field.minValue}
              onChange={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              className={meta.error && meta.touched ? "error" : ""}
              step={field.step}
            />
          )}
          {field.type === FORM_FIELD_TYPE.MARKDOWNEDITOR && (
            <MarkdownEditor
              placeholder={field.placeholder}
              value={input?.value ?? ""}
              disabled={field.disabled}
              onChange={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              className={meta.error && meta.touched ? "error" : ""}
            />
          )}
          {field.type === FORM_FIELD_TYPE.TEXTAREA && (
            <TextArea
              placeholder={field.placeholder}
              value={input?.value ?? ""}
              onChange={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              className={meta.error && meta.touched ? "error" : ""}
            />
          )}
          {field.type === FORM_FIELD_TYPE.DATE && (
            <DateInput
              placeholder={field.placeholder}
              value={input?.value ?? ""}
              onChange={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              className={meta.error && meta.touched ? "error" : ""}
            />
          )}
          {field.type === FORM_FIELD_TYPE.SELECT && (
            <ReactSelect
              value={input?.value ?? ""}
              options={field.selectOptions}
              isMulti={field.isMulti}
              onChange={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              disabled={field.disabled}
            />
          )}
          {(field.isRequired || field.customValidator) &&
            meta.error &&
            meta.touched && <div styleName="field-error">{meta.error}</div>}
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
