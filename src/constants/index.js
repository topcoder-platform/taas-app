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
 * The delay in milliseconds we are giving to ElasticSearch of re-index changes
 */
export const ES_REINDEX_DELAY = 3000;

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
 * Supported Badge Types
 */
export const BADGE_TYPE = {
  PRIMARY: "primary",
  DANGER: "danger",
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
  INTERVIEW: "interview",
};

/**
 * Candidate status filters keys
 */
export const CANDIDATE_STATUS_FILTER_KEY = {
  TO_REVIEW: "TO_REVIEW",
  INTERESTED: "INTERESTED",
  NOT_INTERESTED: "NOT_INTERESTED",
};

/**
 * Candidate status filters
 */
export const CANDIDATE_STATUS_FILTERS = [
  {
    key: CANDIDATE_STATUS_FILTER_KEY.TO_REVIEW,
    buttonText: "To Review",
    title: "Candidates to Review",
    statuses: [CANDIDATE_STATUS.OPEN],
  },
  {
    key: CANDIDATE_STATUS_FILTER_KEY.INTERESTED,
    buttonText: "Interested",
    title: "Interested Candidates",
    statuses: [CANDIDATE_STATUS.SHORTLIST, CANDIDATE_STATUS.INTERVIEW],
  },
  {
    key: CANDIDATE_STATUS_FILTER_KEY.NOT_INTERESTED,
    buttonText: "Not Interested",
    title: "Not Interested Candidates",
    statuses: [CANDIDATE_STATUS.REJECTED],
  },
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
  /*
    Position Details
   */
  LOAD_POSITION: "LOAD_POSITION",
  LOAD_POSITION_PENDING: "LOAD_POSITION_PENDING",
  LOAD_POSITION_SUCCESS: "LOAD_POSITION_SUCCESS",
  LOAD_POSITION_ERROR: "LOAD_POSITION_ERROR",

  RESET_POSITION_STATE: "RESET_POSITION_STATE",

  UPDATE_CANDIDATE: "UPDATE_CANDIDATE",
  UPDATE_CANDIDATE_PENDING: "UPDATE_CANDIDATE_PENDING",
  UPDATE_CANDIDATE_SUCCESS: "UPDATE_CANDIDATE_SUCCESS",
  UPDATE_CANDIDATE_ERROR: "UPDATE_CANDIDATE_ERROR",

  /*
    withAuthentication
   */
  AUTH_USER_SUCCESS: "AUTH_USER_SUCCESS",
  AUTH_USER_ERROR: "AUTH_USER_ERROR",
  // load team members for authentication/permission purposes
  AUTH_LOAD_TEAM_MEMBERS: "AUTH_LOAD_TEAM_MEMBERS",
  AUTH_LOAD_TEAM_MEMBERS_PENDING: "AUTH_LOAD_TEAM_MEMBERS_PENDING",
  AUTH_LOAD_TEAM_MEMBERS_SUCCESS: "AUTH_LOAD_TEAM_MEMBERS_SUCCESS",
  AUTH_LOAD_TEAM_MEMBERS_ERROR: "AUTH_LOAD_TEAM_MEMBERS_ERROR",
  AUTH_CLEAR_TEAM_MEMBERS: "AUTH_CLEAR_TEAM_MEMBERS",

  /*
    Email Popup
   */
  OPEN_EMAIL_POPUP: "OPEN_EMAIL_POPUP",
  CLOSE_EMAIL_POPUP: "CLOSE_EMAIL_POPUP",

  /*
    Team (project) Members
  */
  LOAD_MEMBERS: "LOAD_MEMBERS",
  LOAD_MEMBERS_PENDING: "LOAD_MEMBERS_PENDING",
  LOAD_MEMBERS_SUCCESS: "LOAD_MEMBERS_SUCCESS",
  LOAD_MEMBERS_ERROR: "LOAD_MEMBERS_ERROR",
  LOAD_INVITES: "LOAD_INVITES",
  LOAD_INVITES_PENDING: "LOAD_INVITES_PENDING",
  LOAD_INVITES_SUCCESS: "LOAD_INVITES_SUCCESS",
  LOAD_INVITES_ERROR: "LOAD_INVITES_ERROR",
  LOAD_MEMBERS_SUGGESTIONS: "LOAD_MEMBERS_SUGGESTIONS",
  LOAD_MEMBERS_SUGGESTIONS_PENDING: "LOAD_MEMBERS_SUGGESTIONS_PENDING",
  LOAD_MEMBERS_SUGGESTIONS_SUCCESS: "LOAD_MEMBERS_SUGGESTIONS_SUCCESS",
  LOAD_MEMBERS_SUGGESTIONS_ERROR: "LOAD_MEMBERS_SUGGESTIONS_ERROR",
  REMOVE_MEMBER: "REMOVE_MEMBER",
  REMOVE_MEMBER_PENDING: "REMOVE_MEMBER_PENDING",
  REMOVE_MEMBER_SUCCESS: "REMOVE_MEMBER_SUCCESS",
  REMOVE_MEMBER_ERROR: "REMOVE_MEMBER_ERROR",
  ADD_MEMBERS: "ADD_MEMBERS",
  ADD_MEMBERS_PENDING: "ADD_MEMBERS_PENDING",
  ADD_MEMBERS_SUCCESS: "ADD_MEMBERS_SUCCESS",
  ADD_MEMBERS_ERROR: "ADD_MEMBERS_ERROR",
  RESET_MEMBERS_STATE: "RESET_MEMBERS_STATE",
  CLEAR_MEMBERS_SUGGESTIONS: "CLEAR_MEMBERS_SUGGESTIONS",
};

/**
 * All form field types
 */
export const FORM_FIELD_TYPE = {
  TEXT: "text",
  TEXTAREA: "textarea",
  MARKDOWNEDITOR: "markdowneditor",
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
