import React, { useMemo, useState } from "react";
import PT from "prop-types";
import { Form, Field } from "react-final-form";
import FormField from "components/FormField";
import BaseCreateModal from "../BaseCreateModal";
import { FORM_FIELD_TYPE } from "constants/";
import { formatPlural } from "utils/format";
import Button from "components/Button";
import RadioFieldGroup from "components/RadioFieldGroup";
import "./styles.module.scss";

const addedRoles = [
  { id: "6d0f7085-4ae3-4ed8-b1a8-6599e7b7bad2", name: "Angular Developer" },
];

function TeamDetailsModal() {
  const [showDescription, setShowDescription] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleDescription = () => {
    setShowDescription((prevState) => !prevState);
  };

  const onSubmit = (formData) => {
    setSubmitting(true);
    console.log(formData);
  };

  const buttons = (
    <Button
      type="primary"
      size="medium"
      disabled={submitting}
      onClick={(e) => submit(e)}
    >
      Submit
    </Button>
  );

  let submit;

  return (
    <BaseCreateModal
      open={open}
      onClose={() => setOpen(false)}
      title="Team Details"
      subtitle="Please provide your team details before submitting a request."
      buttons={buttons}
    >
      <Form onSubmit={onSubmit} initialValues={{ teamName: "My Great Team" }}>
        {({ handleSubmit }) => {
          submit = handleSubmit;
          return (
            <div>
              <FormField
                field={{
                  type: FORM_FIELD_TYPE.TEXT,
                  name: "teamName",
                  label: "Team Name",
                  placeholder: "Team Name",
                  maxLength: 50,
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
                styleName="toggle-description"
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
                        initialValue={1}
                      />
                    </td>
                    <td>
                      <Field
                        name={`${id}.duration`}
                        component="input"
                        type="number"
                        initialValue={3}
                      />
                    </td>
                    <td>
                      <Field
                        name={`${id}.startMonth`}
                        component="input"
                        type="month"
                      />
                    </td>
                  </tr>
                ))}
              </table>
              <RadioFieldGroup
                name="time"
                isHorizontal
                radios={[
                  {
                    label: "30 Minute Interview",
                    value: "interview-30",
                  },
                  {
                    label: "60 Minute Interview",
                    value: "interview-60",
                  },
                ]}
              />
            </div>
          );
        }}
      </Form>
    </BaseCreateModal>
  );
}

TeamDetailsModal.propTypes = {};

export default TeamDetailsModal;
