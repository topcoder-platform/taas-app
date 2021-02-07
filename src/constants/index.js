/**
 * This file should contain all application constants which do not depend on the DEV/PROD environment.
 */

/**
 * Day format
 */
export const DAY_FORMAT = "MM/DD/YYYY";

/**
 * How many team member show per page by default
 */
export const TEAM_MEMBERS_PER_PAGE = 5;

/**
 * How many teams  show per page by default
 */
export const TEAMS_PER_PAGE = 20;

/**
 * How many position candidates show per page by default
 */
export const POSITION_CANDIDATES_PER_PAGE = 5;

/**
 * Input debounce delay (ms)
 */
export const INPUT_DEBOUNCE_DELAY = 200;

/**
 * Position statuses
 */
export const POSITION_STATUS = {
  SOURCING: "sourcing",
  IN_REVIEW: "in-review",
  ASSIGNED: "assigned",
  CLOSED: "closed",
  CANCELLED: "cancelled",
};

/**
 * Mapping between position status "server value" and human readable value
 */
export const POSITION_STATUS_TO_TEXT = {
  [POSITION_STATUS.SOURCING]: "Sourcing",
  [POSITION_STATUS.IN_REVIEW]: "Candidates Available for Review",
  [POSITION_STATUS.ASSIGNED]: "Assigned",
  [POSITION_STATUS.CLOSED]: "Closed",
  [POSITION_STATUS.CANCELLED]: "Cancelled",
};

/**
 * Supported Button Sizes
 */
export const BUTTON_SIZE = {
  SMALL: "small",
  MEDIUM: "medium",
};

/**
 * Supported Button Types
 */
export const BUTTON_TYPE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  WARNING: "warning",
  SEGMENT: "segment",
  SEGMENT_SELECTED: "segment-selected",
};

/**
 * Type of rate
 */
export const RATE_TYPE = {
  HOURLY: "hourly",
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
};

/**
 * Candidate status for position
 */
export const CANDIDATE_STATUS = {
  OPEN: "open",
  SELECTED: "selected",
  SHORTLIST: "shortlist",
  REJECTED: "rejected",
};

/**
 * Mapping between candidate status "server value" and human readable value
 */
export const CANDIDATE_STATUS_TO_TEXT = {
  [CANDIDATE_STATUS.OPEN]: "To Review",
  [CANDIDATE_STATUS.SELECTED]: "Selected",
  [CANDIDATE_STATUS.SHORTLIST]: "Interested",
  [CANDIDATE_STATUS.REJECTED]: "Not Interested",
};

/**
 * Mapping between candidate status "server value" and list title text
 */
export const CANDIDATE_STATUS_TO_TITLE_TEXT = {
  [CANDIDATE_STATUS.OPEN]: "Candidates to Review",
  [CANDIDATE_STATUS.SHORTLIST]: "Interested Candidates",
  [CANDIDATE_STATUS.REJECTED]: "Not Interested Candidates",
};

/**
 * Which candidate status filters to show on the open position details page
 */
export const CANDIDATE_STATUS_FILTERS = [
  CANDIDATE_STATUS.OPEN,
  CANDIDATE_STATUS.SHORTLIST,
  CANDIDATE_STATUS.REJECTED,
];

/**
 * Candidates "sort by" values
 */
export const CANDIDATES_SORT_BY = {
  SKILL_MATCHED: "skillsMatched",
  HANDLE: "handle",
};

/**
 * Candidates "sort by" select options
 */
export const CANDIDATES_SORT_OPTIONS = [
  { label: "Skill Matched", value: CANDIDATES_SORT_BY.SKILL_MATCHED },
  { label: "Handle", value: CANDIDATES_SORT_BY.HANDLE },
];

/**
 * All action types
 */
export const ACTION_TYPE = {
  LOAD_POSITION: "LOAD_POSITION",
  LOAD_POSITION_PENDING: "LOAD_POSITION_PENDING",
  LOAD_POSITION_SUCCESS: "LOAD_POSITION_SUCCESS",
  LOAD_POSITION_ERROR: "LOAD_POSITION_ERROR",

  RESET_POSITION_STATE: "RESET_POSITION_STATE",

  UPDATE_CANDIDATE: "UPDATE_CANDIDATE",
  UPDATE_CANDIDATE_PENDING: "UPDATE_CANDIDATE_PENDING",
  UPDATE_CANDIDATE_SUCCESS: "UPDATE_CANDIDATE_SUCCESS",
  UPDATE_CANDIDATE_ERROR: "UPDATE_CANDIDATE_ERROR",
};

/**
 * All fonr field types
 */
export const FORM_FIELD_TYPE = {
  TEXT: "text",
  TEXTAREA: "textarea",
  NUMBER: "number",
  SELECT: "select",
  MULTISELECT: "multiselect",
  DATE: "date",
  DATERANGE: "date_range",
};

/**
 * All form action types
 */
export const FORM_ACTION_TYPE = {
  SUBMIT: "submit",
  BACK: "back",
  CUSTOM: "custom",
};

/**
 * All form row types
 */
export const FORM_ROW_TYPE = {
  SINGLE: "single",
  GROUP: "group",
};

/**
 * Rate type options
 */
export const RATE_TYPE_OPTIONS = [
  { value: null, label: "" },
  { value: "hourly", label: "hourly" },
  { value: "daily", label: "daily" },
  { value: "weekly", label: "weekly" },
  { value: "monthly", label: "monthly" },
];

/**
 * workload options
 */
export const WORKLOAD_OPTIONS = [
  { value: null, label: "" },
  { value: "full-time", label: "full-time" },
  { value: "fractional", label: "fractional" },
];

/**
 * status options
 */
export const STATUS_OPTIONS = [
  { value: "sourcing", label: "sourcing" },
  { value: "in-review", label: "in-review" },
  { value: "assigned", label: "assigned" },
  { value: "closed", label: "closed" },
  { value: "cancelled", label: "cancelled" },
];
