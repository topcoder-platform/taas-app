/**
 * JobForm utilities
 */
import { PERMISSIONS } from "constants/permissions";
import { hasPermission } from "utils/permissions";
import { DISABLED_DESCRIPTION_MESSAGE } from "constants";
import {
  RATE_TYPE_OPTIONS,
  JOB_STATUS_OPTIONS,
  WORKLOAD_OPTIONS,
  RESOURCE_TYPE_OPTIONS,
  FORM_ROW_TYPE,
  FORM_FIELD_TYPE,
  MIN_DURATION,
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

const validateDuration = (x, y, {duration}) => {
  if (duration === undefined) return undefined;
  const converted = Number(duration);

  if (isNaN(converted) || converted < MIN_DURATION) {
    return `Talent as a Service engagements have a ${MIN_DURATION} week minimum commitment.`;
  }

  return undefined;
}

/**
 * return edit job configuration
 * @param {any} skillOptions skill options
 * @param {boolean} isMarkdownEditorDisabled is markedownEditor disabled
 * @param {onlyEnableStatus}  only can select status field
 * @param {func} onSubmit submit callback
 */
export const getEditJobConfig = (
  skillOptions,
  isMarkdownEditorDisabled,
  onlyEnableStatus,
  onSubmit
) => {
  return {
    fields: [
      {
        label: "Job Name",
        type: FORM_FIELD_TYPE.TEXT,
        isRequired: true,
        validationMessage: "Please, enter Job Name",
        name: "title",
        maxLength: 128,
        disabled: onlyEnableStatus,
        placeholder: "Job Name",
      },
      {
        label: "Job Description",
        type: FORM_FIELD_TYPE.MARKDOWNEDITOR,
        name: "description",
        disabled: isMarkdownEditorDisabled || onlyEnableStatus,
        errorMessage: isMarkdownEditorDisabled && DISABLED_DESCRIPTION_MESSAGE,
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
        disabled: onlyEnableStatus,
        step: 1,
      },
      {
        label: "Job Skills",
        type: FORM_FIELD_TYPE.SELECT,
        isMulti: true,
        name: "skills",
        disabled: onlyEnableStatus,
        selectOptions: skillOptions,
      },
      {
        label: "Start Date",
        type: FORM_FIELD_TYPE.DATE,
        name: "startDate",
        disabled: onlyEnableStatus,
        placeholder: "Start Date",
      },
      {
        label: "Duration (weekly)",
        type: FORM_FIELD_TYPE.NUMBER,
        name: "duration",
        minValue: 1,
        placeholder: "Duration",
        disabled: onlyEnableStatus,
        step: 1,
        customValidator: validateDuration,
      },
      {
        label: "Resource Type",
        type: FORM_FIELD_TYPE.SELECT,
        name: "resourceType",
        disabled: onlyEnableStatus,
        selectOptions: RESOURCE_TYPE_OPTIONS,
      },
      {
        label: "Resource Rate Frequency",
        type: FORM_FIELD_TYPE.SELECT,
        name: "rateType",
        disabled: onlyEnableStatus,
        selectOptions: RATE_TYPE_OPTIONS,
      },
      {
        label: "Workload",
        type: FORM_FIELD_TYPE.SELECT,
        name: "workload",
        disabled: onlyEnableStatus,
        selectOptions: WORKLOAD_OPTIONS,
      },
      {
        label: "Status",
        type: FORM_FIELD_TYPE.SELECT,
        isRequired: true,
        validationMessage: "Please, select Status",
        name: "status",
        selectOptions: JOB_STATUS_OPTIONS,
        disabled: !hasPermission(PERMISSIONS.UPDATE_JOB_STATUS),
      },
    ],
    onSubmit: onSubmit,
    rows: EDIT_JOB_ROWS,
  };
};
