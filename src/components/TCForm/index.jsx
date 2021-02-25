/**
 * Form component
 *
 * Shows form, field and actions.
 */
import React, { useState, useEffect } from "react";
import _ from "lodash";
import PT from "prop-types";
import { FORM_ROW_TYPE, FORM_FIELD_TYPE } from "../../constants";
import { Form } from "react-final-form";
import {
  createFormData,
  createConfigurationObject,
  getValidator,
  prepareSubmitData,
} from "./utils";
import FormField from "../FormField";
import Button from "../Button";
import "./styles.module.scss";

const TCForm = ({
  configuration,
  initialValue,
  submitButton,
  backButton,
  submitting,
  setSubmitting,
}) => {
  const [formValue, setFormValue] = useState(null);
  const [fields, setFields] = useState(null);

  useEffect(() => {
    const data = createFormData(initialValue, configuration.fields);
    const constFieldConfigs = createConfigurationObject(configuration.fields);
    setFormValue(data);
    setFields(constFieldConfigs);
  }, []);

  return (
    formValue &&
    fields && (
      <Form
        initialValues={formValue}
        onSubmit={(val) => {
          setSubmitting(true);
          configuration.onSubmit(
            prepareSubmitData(val, configuration.fields, initialValue)
          );
        }}
        validate={getValidator(configuration.fields)}
        render={({ handleSubmit, invalid, dirty }) => (
          <form onSubmit={handleSubmit} styleName="tc-form">
            <div styleName="job-form-fields-container">
              <div styleName="job-form-fields-wrapper">
                {configuration.rows.map((row) => {
                  return (
                    <>
                      {row.type === FORM_ROW_TYPE.GROUP && (
                        <div styleName="field-group">
                          {row.fields.map((field) =>
                            !fields[field].hidden ? (
                              <div
                                styleName="field-group-field"
                                key={field.name}
                              >
                                <FormField field={fields[field]} />
                              </div>
                            ) : null
                          )}
                        </div>
                      )}
                      {row.type === FORM_ROW_TYPE.SINGLE &&
                        row.fields.map((field) =>
                          !fields[field].hidden ? (
                            <FormField field={fields[field]} />
                          ) : null
                        )}
                    </>
                  );
                })}
              </div>
            </div>
            <div styleName="form-actions">
              <Button
                size="medium"
                isSubmit={true}
                disabled={invalid || !dirty || submitting}
              >
                {submitButton.text}
              </Button>
              <Button
                type="secondary"
                size="small"
                routeTo={backButton.backTo}
                disabled={submitting}
              >
                {backButton.text}
              </Button>
            </div>
          </form>
        )}
      />
    )
  );
};

TCForm.propTypes = {
  configuration: PT.shape({
    fields: PT.arrayOf(
      PT.shape({
        label: PT.string,
        type: PT.oneOf(Object.values(FORM_FIELD_TYPE)).isRequired,
        isRequired: PT.bool,
        customValidator: PT.func,
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
        step: PT.number,
      })
    ).isRequired,
    onSubmit: PT.func,
    rows: PT.arrayOf(
      PT.shape({
        styleName: PT.string,
        type: PT.oneOf(Object.values(FORM_ROW_TYPE)).isRequired,
        fields: PT.arrayOf(PT.string),
      })
    ).isRequired,
  }).isRequired,
  initialValue: PT.object.isRequired,
  submitButton: PT.shape({
    text: PT.string.isRequired,
  }).isRequired,
  backButton: PT.shape({
    text: PT.string.isRequired,
    backTo: PT.string.isRequired,
  }).isRequired,
  submitting: PT.bool,
  setSubmitting: PT.func,
};

export default TCForm;
