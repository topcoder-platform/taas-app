/**
 * Edit Role Form
 * form for eidting details about current role
 */
import React, { useEffect, useState } from "react";
import PT from "prop-types";
import { Form, Field, useField } from "react-final-form";
import FormField from "components/FormField";
import BaseCreateModal from "../BaseCreateModal";
import Button from "components/Button";
import MonthPicker from "components/MonthPicker";
import InformationTooltip from "components/InformationTooltip";
import IconCrossLight from "../../../../assets/images/icon-cross-light.svg";
import "./styles.module.scss";
import NumberInput from "components/NumberInput";
import Select from "components/Select";
import {
  validator,
  validateExists,
  validateMin,
  composeValidators,
} from "./utils/validator";
import { MIN_DURATION, FULL_OR_PART_TIME_OPTIONS } from "constants";

const Error = ({ name }) => {
  const {
    meta: { dirty, error },
  } = useField(name, { subscription: { dirty: true, error: true } });
  return dirty && error ? <span styleName="error">{error}</span> : null;
};

function EditRoleForm({ onChange, role }) {
  const [startMonthVisible, setStartMonthVisible] = useState(false);
  const onRoleChange = (state) => {
    if (state.hasValidationErrors) {
      onChange(false);
    } else {
      onChange(true, state.values);
    }
  };

  return (
    <Form
      onSubmit={() => {}}
      mutators={{
        clearField: ([fieldName], state, { changeValue }) => {
          changeValue(state, fieldName, () => undefined);
        },
      }}
      validate={validator}
    >
      {({
        form: {
          mutators: { clearField },
          getState,
        },
      }) => {
        return (
          <div styleName="table-container">
            <table styleName="table">
              <tr>
                <th># of resources</th>
                <th>Duration (weeks)</th>
                <th>Start month</th>
                <th>Full or Part Time</th>
              </tr>
              <tr styleName="role-row">
                <td>
                  <Field
                    validate={composeValidators(
                      validateExists,
                      validateMin(1, "Should be 1 or greater")
                    )}
                    name="numberOfResources"
                    initialValue={role.numberOfResources}
                  >
                    {({ input, meta }) => (
                      <NumberInput
                        name={input.name}
                        value={input.value}
                        onChange={(v) => {
                          input.onChange(v);
                          onRoleChange(getState());
                        }}
                        onBlur={input.onBlur}
                        onFocus={input.onFocus}
                        min="1"
                        error={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                  <Error name="numberOfResources" />
                </td>
                <td>
                  <Field
                    validate={composeValidators(
                      validateExists,
                      validateMin(
                        MIN_DURATION,
                        `Talent as a Service engagements have a ${MIN_DURATION} week minimum commitment.`
                      )
                    )}
                    name="durationWeeks"
                    initialValue={role.durationWeeks}
                  >
                    {({ input, meta }) => (
                      <NumberInput
                        name={input.name}
                        value={input.value}
                        onChange={(v) => {
                          input.onChange(v);
                          onRoleChange(getState());
                        }}
                        onBlur={input.onBlur}
                        onFocus={input.onFocus}
                        min="4"
                        error={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                  <Error name="durationWeeks" />
                </td>
                <td>
                  {startMonthVisible ? (
                    <>
                      <Field name="startMonth" initialValue={Date.now()}>
                        {(props) => (
                          <MonthPicker
                            name={props.input.name}
                            value={props.input.value}
                            onChange={(v) => {
                              props.input.onChange(v);
                              onRoleChange(getState());
                            }}
                            onBlur={props.input.onBlur}
                            onFocus={props.input.onFocus}
                          />
                        )}
                      </Field>
                      <Error name="startMonth" />
                    </>
                  ) : (
                    <div styleName="flex-container">
                      <button
                        styleName="toggle-button"
                        onClick={() => setStartMonthVisible(true)}
                      >
                        Add Start Month
                      </button>
                      <InformationTooltip
                        iconSize="14px"
                        text="Requested start month for this position."
                      />
                    </div>
                  )}
                </td>
                <td>
                  <Field name="hoursPerWeek" initialValue={"40"}>
                    {(props) => (
                      <Select
                        name={props.input.name}
                        value={props.input.value}
                        onChange={(v) => {
                          props.input.onChange(v);
                          onRoleChange(getState());
                        }}
                        options={FULL_OR_PART_TIME_OPTIONS}
                        styleName="select"
                      />
                    )}
                  </Field>
                </td>
              </tr>
            </table>
          </div>
        );
      }}
    </Form>
  );
}

EditRoleForm.propTypes = {
  submitForm: PT.func,
  role: PT.object,
};

export default EditRoleForm;
