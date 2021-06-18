/**
 * Team Details Modal
 * Popup form to enter details about the
 * team request before submitting.
 */
import React, { useState } from "react";
import PT from "prop-types";
import { Form, Field, useField } from "react-final-form";
import FormField from "components/FormField";
import BaseCreateModal from "../BaseCreateModal";
import { FORM_FIELD_TYPE } from "constants/";
import { formatPlural } from "utils/format";
import Button from "components/Button";
import "./styles.module.scss";
import DatePicker from "react-datepicker";
import InformationTooltip from "components/InformationTooltip";

const Error = ({ name }) => {
  const {
    meta: { dirty, error },
  } = useField(name, { subscription: { dirty: true, error: true } });
  return dirty && error ? <span styleName="error">{error}</span> : null;
};

function TeamDetailsModal({ open, onClose, submitForm, addedRoles }) {
  const [showDescription, setShowDescription] = useState(false);
  const [startMonthVisible, setStartMonthVisible] = useState(() => {
    const roles = {};
    addedRoles.forEach(({ searchId }) => {
      roles[searchId] = false;
    });
    return roles;
  });

  const toggleDescription = () => {
    setShowDescription((prevState) => !prevState);
  };

  const validateName = (name) => {
    if (!name || name.trim().length === 0) {
      return "Please enter a team name.";
    }
    return undefined;
  };

  const validateNumber = (number) => {
    const converted = Number(number);

    if (
      Number.isNaN(converted) ||
      converted !== Math.floor(converted) ||
      converted < 1
    ) {
      return "Please enter a positive integer";
    }
    return undefined;
  };

  const validateMonth = (monthString) => {
    const then = new Date(monthString);
    const now = new Date();
    const thenYear = then.getFullYear();
    const nowYear = now.getFullYear();
    const thenMonth = then.getMonth();
    const nowMonth = now.getMonth();

    if (thenYear < nowYear || (thenYear === nowYear && thenMonth < nowMonth)) {
      return "Start month may not be before current month";
    }
    return undefined;
  };

  const validateRole = (role) => {
    const roleErrors = {};
    roleErrors.numberOfResources = validateNumber(role.numberOfResources);
    roleErrors.durationWeeks = validateNumber(role.durationWeeks);
    if (role.startMonth) {
      roleErrors.startMonth = validateMonth(role.startMonth);
    }

    return roleErrors;
  };

  const validator = (values) => {
    const errors = {};

    errors.teamName = validateName(values.teamName);

    for (const key of Object.keys(values)) {
      if (key === "teamDescription" || key === "teamName") continue;
      errors[key] = validateRole(values[key]);
    }

    return errors;
  };

  return (
    <Form
      onSubmit={submitForm}
      mutators={{
        clearField: ([fieldName], state, { changeValue }) => {
          changeValue(state, fieldName, () => undefined);
        },
      }}
      initialValues={{ teamName: "My Great Team" }}
      validate={validator}
    >
      {({
        handleSubmit,
        hasValidationErrors,
        form: {
          mutators: { clearField },
        },
      }) => {
        return (
          <BaseCreateModal
            open={open}
            onClose={onClose}
            title="Team Details"
            subtitle="Please provide your team details before submitting a request."
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
              {showDescription && (
                <FormField
                  field={{
                    type: FORM_FIELD_TYPE.TEXTAREA,
                    name: "teamDescription",
                    label: "Short description about the team/ project",
                    placeholder: "Short description about the team/ project",
                    maxLength: 600,
                  }}
                />
              )}
              <button
                styleName="toggle-button toggle-description"
                onClick={() => {
                  clearField("teamDescription");
                  toggleDescription();
                }}
              >
                <span>{showDescription ? "–" : "+"}</span>
                {showDescription ? " Remove Description" : " Add Description"}
              </button>
              <table styleName="table">
                <tr>
                  <th styleName="bold">
                    {formatPlural(addedRoles.length, "Role")} Added
                  </th>
                  <th># of resources</th>
                  <th>Duration (weeks)</th>
                  <th>Start month</th>
                </tr>
                {addedRoles.map(({ searchId: id, name }) => (
                  <tr styleName="role-row" key={id}>
                    <td>{name}</td>
                    <td>
                      <Field
                        name={`${id}.numberOfResources`}
                        component="input"
                        type="number"
                        initialValue="3"
                        min="1"
                      />
                      <Error name={`${id}.numberOfResources`} />
                    </td>
                    <td>
                      <Field
                        name={`${id}.durationWeeks`}
                        component="input"
                        type="number"
                        initialValue="20"
                        min="1"
                      />
                      <Error name={`${id}.durationWeeks`} />
                    </td>
                    <td styleName="start-month">
                      {startMonthVisible[id] ? (
                        <>
                          <Field
                            name={`${id}.startMonth`}
                            initialValue={Date.now()}
                          >
                            {(props) => (
                              <DatePicker
                                name={props.input.name}
                                selected={props.input.value}
                                onChange={props.input.onChange}
                                dateFormat="MMM, yyyy"
                                showMonthYearPicker
                                showPopperArrow={false}
                                onBlur={props.input.onBlur}
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
                  </tr>
                ))}
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
