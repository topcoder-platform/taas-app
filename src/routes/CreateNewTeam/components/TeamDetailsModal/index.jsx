import React, { useMemo, useState } from "react";
import PT from "prop-types";
import { Form, Field, useField } from "react-final-form";
import FormField from "components/FormField";
import BaseCreateModal from "../BaseCreateModal";
import { FORM_FIELD_TYPE } from "constants/";
import { formatPlural } from "utils/format";
import Button from "components/Button";
import "./styles.module.scss";

const addedRoles = [
  { id: "testID", name: "Angular Developer" },
  { id: "testID2", name: "DevOps Engineer" },
];

const Error = ({ name }) => {
  const {
    meta: { touched, error },
  } = useField(name, { subscription: { touched: true, error: true } });
  return touched && error ? <span styleName="error">{error}</span> : null;
};

function TeamDetailsModal({ open, setOpen }) {
  const [showDescription, setShowDescription] = useState(false);
  const [startMonthVisible, setStartMonthVisible] = useState(() => {
    const roles = {};
    addedRoles.forEach(({ id }) => {
      roles[id] = false;
    });
    return roles;
  });

  const toggleDescription = () => {
    setShowDescription((prevState) => !prevState);
  };

  const onSubmit = (formData) => {
    console.log(formData);
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
    roleErrors.resources = validateNumber(role.resources);
    roleErrors.duration = validateNumber(role.duration);
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
      onSubmit={onSubmit}
      initialValues={{ teamName: "My Great Team" }}
      validate={validator}
    >
      {({ handleSubmit, hasValidationErrors }) => {
        return (
          <BaseCreateModal
            open={open}
            onClose={() => setOpen(false)}
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
                  maxLength: 50,
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
                    maxLength: 1000,
                  }}
                />
              )}
              <button
                styleName="toggle-button toggle-description"
                onClick={toggleDescription}
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
                {addedRoles.map(({ id, name }) => (
                  <tr styleName="role-row" key={id}>
                    <td>{name}</td>
                    <td>
                      <Field
                        name={`${id}.resources`}
                        component="input"
                        type="number"
                        initialValue="3"
                      />
                      <Error name={`${id}.resources`} />
                    </td>
                    <td>
                      <Field
                        name={`${id}.duration`}
                        component="input"
                        type="number"
                        initialValue="20"
                      />
                      <Error name={`${id}.duration`} />
                    </td>
                    <td>
                      {startMonthVisible[id] ? (
                        <>
                          <Field
                            name={`${id}.startMonth`}
                            component="input"
                            type="month"
                          />
                          <Error name={`${id}.startMonth`} />
                        </>
                      ) : (
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

TeamDetailsModal.propTypes = {};

export default TeamDetailsModal;
