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
import { FORM_FIELD_TYPE } from "constants/";
import { formatPlural } from "utils/format";
import Button from "components/Button";
import MonthPicker from "components/MonthPicker";
import InformationTooltip from "components/InformationTooltip";
import { deleteSearchedRole } from "../../actions";
import IconCrossLight from "../../../../assets/images/icon-cross-light.svg";
import "./styles.module.scss";
import NumberInput from "components/NumberInput";
import validator from "./utils/validator";

const Error = ({ name }) => {
  const {
    meta: { dirty, error },
  } = useField(name, { subscription: { dirty: true, error: true } });
  return dirty && error ? <span styleName="error">{error}</span> : null;
};

function TeamDetailsModal({ open, onClose, submitForm, addedRoles }) {
  const [showDescription, setShowDescription] = useState(false);
  const [startMonthVisible, setStartMonthVisible] = useState({});

  // Ensure role is removed from form state when it is removed from redux store
  let getFormState;
  let clearFormField;
  useEffect(() => {
    const values = getFormState().values;
    for (let fieldName of Object.keys(values)) {
      if (fieldName === "teamName" || fieldName === "teamDescription") {
        continue;
      }
      if (addedRoles.findIndex((role) => role.searchId === fieldName) === -1) {
        clearFormField(fieldName);
        setStartMonthVisible((state) => ({ ...state, [fieldName]: false }));
      }
    }
  }, [getFormState, addedRoles, clearFormField]);

  const dispatch = useDispatch();

  const toggleDescription = () => {
    setShowDescription((prevState) => !prevState);
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
                  <th></th>
                </tr>
                {addedRoles.map(({ searchId: id, name }) => (
                  <tr styleName="role-row" key={id}>
                    <td>{name}</td>
                    <td>
                      <Field name={`${id}.numberOfResources`} initialValue="3">
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
                      <Field name={`${id}.durationWeeks`} initialValue="20">
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
                      <Error name={`${id}.durationWeeks`} />
                    </td>
                    <td>
                      {startMonthVisible[id] ? (
                        <>
                          <Field
                            name={`${id}.startMonth`}
                            initialValue={Date.now()}
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
