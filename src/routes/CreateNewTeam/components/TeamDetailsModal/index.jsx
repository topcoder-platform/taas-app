/**
 * Team Details Modal
 * Popup form to enter details about the
 * team request before submitting.
 */
import React, { useEffect, useState } from "react";
import PT from "prop-types";
import { Form, Field, useField } from "react-final-form";
import { useDispatch } from "react-redux";
import FormField from "components/FormField";
import BaseCreateModal from "../BaseCreateModal";
import { FORM_FIELD_TYPE, FULL_OR_PART_TIME_OPTIONS } from "constants/";
import { formatPlural } from "utils/format";
import { isUuid } from "utils/helpers";
import Button from "components/Button";
import Select from "components/Select";
import MonthPicker from "components/MonthPicker";
import InformationTooltip from "components/InformationTooltip";
import { deleteSearchedRole } from "../../actions";
import IconCrossLight from "../../../../assets/images/icon-cross-light.svg";
import "./styles.module.scss";
import NumberInput from "components/NumberInput";
import { validator, validateExists } from "./utils/validator";

const Error = ({ name }) => {
  const {
    meta: { dirty, error },
  } = useField(name, { subscription: { dirty: true, error: true } });
  return dirty && error ? <span styleName="error">{error}</span> : null;
};

function TeamDetailsModal({ open, onClose, submitForm, addedRoles }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [startMonthVisible, setStartMonthVisible] = useState({});

  // Ensure role is removed from form state when it is removed from redux store
  let getFormState;
  let clearFormField;
  useEffect(() => {
    const values = getFormState().values;
    for (let fieldName of Object.keys(values)) {
      if (!isUuid(fieldName)) {
        continue;
      }
      if (addedRoles.findIndex((role) => role.searchId === fieldName) === -1) {
        clearFormField(fieldName);
        setStartMonthVisible((state) => ({ ...state, [fieldName]: false }));
      }
    }
  }, [getFormState, addedRoles, clearFormField]);

  const dispatch = useDispatch();

  const toggleAdvanced = () => {
    setShowAdvanced((prevState) => !prevState);
  };

  return (
    <Form
      onSubmit={submitForm}
      mutators={{
        clearField: ([fieldName], state, { changeValue }) => {
          changeValue(state, fieldName, () => undefined);
        },
      }}
      validate={validator}
    >
      {({
        handleSubmit,
        hasValidationErrors,
        form: {
          mutators: { clearField },
          getState,
        },
      }) => {
        getFormState = getState;
        clearFormField = clearField;
        return (
          <BaseCreateModal
            open={open}
            onClose={onClose}
            maxWidth="830px"
            title="Customize Your Team"
            subtitle="Give your new team a name. This could be the name of the project they will work on or the team they will be joining."
            buttons={
              <Button
                type="primary"
                size="medium"
                onClick={handleSubmit}
                disabled={hasValidationErrors}
              >
                Submit
              </Button>
            }
            disableFocusTrap
          >
            <div styleName="modal-body">
              <FormField
                field={{
                  type: FORM_FIELD_TYPE.TEXT,
                  name: "teamName",
                  label: "Team Name",
                  placeholder: "Team Name",
                  maxLength: 255,
                  customValidator: true,
                }}
              />
              {showAdvanced && (
                <>
                  <FormField
                    field={{
                      type: FORM_FIELD_TYPE.TEXTAREA,
                      name: "teamDescription",
                      label: "Short description about the team/ project",
                      placeholder: "Short description about the team/ project",
                      maxLength: 600,
                    }}
                  />
                  <FormField
                    field={{
                      type: FORM_FIELD_TYPE.TEXT,
                      name: "refCode",
                      label: "Ref Code",
                      placeholder: "Ref Code",
                      maxLength: 255,
                    }}
                  />
                </>
              )}
              <button
                styleName="toggle-button toggle-advanced"
                onClick={() => {
                  clearField("teamDescription");
                  clearField("refCode");
                  toggleAdvanced();
                }}
              >
                <span>{showAdvanced ? "– " : "+ "}</span>
                Advanced Options
              </button>
              <table styleName="table">
                <tr>
                  <th styleName="bold">
                    {formatPlural(addedRoles.length, "Role")} Added
                  </th>
                  <th># of resources</th>
                  <th>Duration (weeks)</th>
                  <th>Start month</th>
                  <th>Full or Part Time</th>
                  <th></th>
                </tr>
                {addedRoles.map(
                  ({
                    searchId: id,
                    name,
                    numberOfResources,
                    durationWeeks,
                    startMonth,
                    hoursPerWeek,
                  }) => (
                    <tr styleName="role-row" key={id}>
                      <td>{name}</td>
                      <td>
                        <Field
                          validate={validateExists}
                          name={`${id}.numberOfResources`}
                          initialValue={numberOfResources || 1}
                        >
                          {({ input, meta }) => (
                            <NumberInput
                              name={input.name}
                              value={input.value}
                              onChange={input.onChange}
                              onBlur={input.onBlur}
                              onFocus={input.onFocus}
                              min="1"
                              error={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                        <Error name={`${id}.numberOfResources`} />
                      </td>
                      <td>
                        <Field
                          validate={validateExists}
                          name={`${id}.durationWeeks`}
                          initialValue={durationWeeks || 4}
                        >
                          {({ input, meta }) => (
                            <NumberInput
                              name={input.name}
                              value={input.value}
                              onChange={input.onChange}
                              onBlur={input.onBlur}
                              onFocus={input.onFocus}
                              min="4"
                              error={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                        <Error name={`${id}.durationWeeks`} />
                      </td>
                      <td>
                        {startMonth || startMonthVisible[id] ? (
                          <>
                            <Field
                              name={`${id}.startMonth`}
                              initialValue={new Date(startMonth).getTime()}
                            >
                              {(props) => (
                                <MonthPicker
                                  name={props.input.name}
                                  value={props.input.value}
                                  onChange={props.input.onChange}
                                  onBlur={props.input.onBlur}
                                  onFocus={props.input.onFocus}
                                />
                              )}
                            </Field>
                            <Error name={`${id}.startMonth`} />
                          </>
                        ) : (
                          <div styleName="flex-container">
                            <button
                              styleName="toggle-button"
                              onClick={() =>
                                setStartMonthVisible((prevState) => ({
                                  ...prevState,
                                  [id]: true,
                                }))
                              }
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
                        <Field
                          name={`${id}.hoursPerWeek`}
                          initialValue={hoursPerWeek || "40"}
                        >
                          {(props) => (
                            <Select
                              name={props.input.name}
                              value={props.input.value}
                              onChange={props.input.onChange}
                              options={FULL_OR_PART_TIME_OPTIONS}
                              styleName="select"
                            />
                          )}
                        </Field>
                      </td>
                      <td>
                        <button
                          styleName="delete-role"
                          onClick={() => {
                            dispatch(deleteSearchedRole(id));
                          }}
                        >
                          <IconCrossLight height="12px" width="12px" />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </table>
            </div>
          </BaseCreateModal>
        );
      }}
    </Form>
  );
}

TeamDetailsModal.propTypes = {
  open: PT.bool,
  onClose: PT.func,
  submitForm: PT.func,
  addedRoles: PT.array,
};

export default TeamDetailsModal;
