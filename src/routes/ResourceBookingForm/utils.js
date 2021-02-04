/**
 * ResourceBookingForm utils
 *
 * utility class
 */
import {
  STATUS_OPTIONS,
  FORM_ROW_TYPE,
  FORM_FIELD_TYPE,
} from "../../constants";

const EDIT_ResourceBooking_ROWS = [
  { type: FORM_ROW_TYPE.SINGLE, fields: ["title"] },
  { type: FORM_ROW_TYPE.SINGLE, fields: ["handle"] },
  { type: FORM_ROW_TYPE.GROUP, fields: ["startDate", "endDate"] },
  { type: FORM_ROW_TYPE.GROUP, fields: ["customerRate", "memberRate"] },
  { type: FORM_ROW_TYPE.SINGLE, fields: ["status"] },
];

/**
 * return edit ResourceBooking configuration
 * @param {func} onSubmit submit callback
 */
export const getEditResourceBookingConfig = (onSubmit) => {
  return {
    fields: [
      { readonly: true, type: FORM_FIELD_TYPE.TEXT, name: "title" },
      { readonly: true, type: FORM_FIELD_TYPE.TEXT, name: "handle" },
      {
        label: "Customer Rate",
        type: FORM_FIELD_TYPE.NUMBER,
        name: "customerRate",
        minValue: 1,
        placeholder: "Customer Rate",
      },
      {
        label: "Member Rate",
        type: FORM_FIELD_TYPE.NUMBER,
        name: "memberRate",
        minValue: 1,
        placeholder: "Member Rate",
      },
      {
        label: "Start Date",
        type: FORM_FIELD_TYPE.DATE,
        name: "startDate",
        placeholder: "Start Date",
      },
      {
        label: "End Date",
        type: FORM_FIELD_TYPE.DATE,
        name: "endDate",
        placeholder: "End Date",
      },
      {
        label: "Status",
        type: FORM_FIELD_TYPE.SELECT,
        isRequired: true,
        validationMessage: "Please, select Status",
        name: "status",
        selectOptions: STATUS_OPTIONS,
      },
    ],
    onSubmit: onSubmit,
    rows: EDIT_ResourceBooking_ROWS,
  };
};
