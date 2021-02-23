/**
 * JobForm utilities
 */
import { PERMISSIONS } from "constants/permissions";
import { hasPermission } from "utils/permissions";
import {
  RATE_TYPE_OPTIONS,
  STATUS_OPTIONS,
  WORKLOAD_OPTIONS,
  FORM_ROW_TYPE,
  FORM_FIELD_TYPE,
} from "../../constants";

const EDIT_JOB_ROWS = [
  { type: FORM_ROW_TYPE.SINGLE, fields: ["title"] },
  { type: FORM_ROW_TYPE.SINGLE, fields: ["description"] },
  { type: FORM_ROW_TYPE.SINGLE, fields: ["numPositions"] },
  { type: FORM_ROW_TYPE.SINGLE, fields: ["skills"] },
  { type: FORM_ROW_TYPE.GROUP, fields: ["startDate", "duration"] },
  { type: FORM_ROW_TYPE.SINGLE, fields: ["resourceType"] },
  { type: FORM_ROW_TYPE.SINGLE, fields: ["rateType"] },
  { type: FORM_ROW_TYPE.SINGLE, fields: ["workload"] },
  { type: FORM_ROW_TYPE.SINGLE, fields: ["status"] },
];

/**
 * return edit job configuration
 * @param {any} skillOptions skill options
 * @param {func} onSubmit submit callback
 */
export const getEditJobConfig = (skillOptions, onSubmit) => {
  return {
    fields: [
      {
        label: "Job Name",
        type: FORM_FIELD_TYPE.TEXT,
        isRequired: true,
        validationMessage: "Please, enter Job Name",
        name: "title",
        maxLength: 128,
        placeholder: "Job Name",
      },
      {
        label: "Job Description",
        type: FORM_FIELD_TYPE.TEXTAREA,
        name: "description",
        placeholder: "Job Description",
      },
      {
        label: "Number Of Opening",
        type: FORM_FIELD_TYPE.NUMBER,
        isRequired: true,
        validationMessage: "Please, enter Job Name",
        name: "numPositions",
        minValue: 1,
        placeholder: "Number Of Opening",
        step: 1,
      },
      {
        label: "Job Skills",
        type: FORM_FIELD_TYPE.SELECT,
        isMulti: true,
        name: "skills",
        selectOptions: skillOptions,
      },
      {
        label: "Start Date",
        type: FORM_FIELD_TYPE.DATE,
        name: "startDate",
        placeholder: "Start Date",
      },
      {
        label: "Duration (weekly)",
        type: FORM_FIELD_TYPE.NUMBER,
        name: "duration",
        minValue: 1,
        placeholder: "Duration",
        step: 1,
      },
      {
        label: "Resource Type",
        type: FORM_FIELD_TYPE.TEXT,
        name: "resourceType",
        maxLength: 255,
        placeholder: "Resource Type",
      },
      {
        label: "Resource Rate Frequency",
        type: FORM_FIELD_TYPE.SELECT,
        name: "rateType",
        selectOptions: RATE_TYPE_OPTIONS,
      },
      {
        label: "Workload",
        type: FORM_FIELD_TYPE.SELECT,
        name: "workload",
        selectOptions: WORKLOAD_OPTIONS,
      },
      {
        label: "Status",
        type: FORM_FIELD_TYPE.SELECT,
        isRequired: true,
        validationMessage: "Please, select Status",
        name: "status",
        selectOptions: STATUS_OPTIONS,
        disabled: !hasPermission(PERMISSIONS.UPDATE_JOB_STATUS),
      },
    ],
    onSubmit: onSubmit,
    rows: EDIT_JOB_ROWS,
  };
};
