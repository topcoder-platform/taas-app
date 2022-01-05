/**
 * This file should contain all application constants which do not depend on the DEV/PROD environment.
 */

/**
 * Day format
 */
export const DAY_FORMAT = "MM/DD/YYYY";

/**
 * Date with time format
 */
export const DATE_WITH_TIME_FORMAT = "MM/DD/YYYY HH:mm";

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
export const ES_REINDEX_DELAY = 0;

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
 * Interview related constants
 */
export const INTERVIEW_STATUS = {
  SCHEDULING: "Scheduling",
  SCHEDULED: "Scheduled",
  REQUESTEDFORRESCHEDULE: "Requested for reschedule",
  RESCHEDULED: "Rescheduled",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired",
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
  LARGE: "large",
  EXTRA_SMALL: "xSmall",
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
  PLACED: "placed",
  CLIENT_REJECTED_SCREENING: "client rejected - screening",
  CLIENT_REJECTED_INTERVIEW: "client rejected - interview",
  REJECTED_OTHER: "rejected - other",
  INTERVIEW: "interview",
  TOPCODER_REJECTED: "topcoder-rejected",
  JOB_CLOSED: "job-closed",
  OFFERED: "offered",
  WITHDRAWN: "withdrawn",
};

/**
 * Candidate status filters keys
 */
export const CANDIDATE_STATUS_FILTER_KEY = {
  TO_REVIEW: "TO_REVIEW",
  INTERESTED: "INTERESTED",
  SELECTED: "SELECTED",
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
    noCandidateMessage: "No Candidates To Review",
    statuses: [CANDIDATE_STATUS.OPEN],
    urlParam: "to-review",
  },
  {
    key: CANDIDATE_STATUS_FILTER_KEY.INTERESTED,
    buttonText: "Interviews",
    title: "Interviews",
    noCandidateMessage: "No Interviews",
    statuses: [CANDIDATE_STATUS.INTERVIEW],
    urlParam: "interviews",
  },
  {
    key: CANDIDATE_STATUS_FILTER_KEY.SELECTED,
    buttonText: "Selected",
    title: "Selected",
    noCandidateMessage: "No Selected Candidates",
    statuses: [CANDIDATE_STATUS.SELECTED, CANDIDATE_STATUS.OFFERED],
    urlParam: "selected",
  },
  {
    key: CANDIDATE_STATUS_FILTER_KEY.NOT_INTERESTED,
    buttonText: "Declined",
    title: "Declined",
    noCandidateMessage: "No Declined Candidates",
    statuses: [
      CANDIDATE_STATUS.CLIENT_REJECTED_SCREENING,
      CANDIDATE_STATUS.CLIENT_REJECTED_INTERVIEW,
      CANDIDATE_STATUS.REJECTED_OTHER,
      CANDIDATE_STATUS.TOPCODER_REJECTED,
      CANDIDATE_STATUS.JOB_CLOSED,
      CANDIDATE_STATUS.WITHDRAWN,
    ],
    urlParam: "declined",
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
  { label: "Skills Matched", value: CANDIDATES_SORT_BY.SKILL_MATCHED },
  { label: "Handle", value: CANDIDATES_SORT_BY.HANDLE },
];

/**
 * "Full or Part Time" select options
 */
export const FULL_OR_PART_TIME_OPTIONS = [
  { label: "Full Time - 40hr/wk", value: "40" },
  { label: "Part Time - 30hr/wk", value: "30" },
  { label: "Part Time - 20hr/wk", value: "20" },
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

  ADD_INTERVIEW: "ADD_INTERVIEW",
  ADD_INTERVIEW_PENDING: "ADD_INTERVIEW_PENDING",
  ADD_INTERVIEW_SUCCESS: "ADD_INTERVIEW_SUCCESS",
  ADD_INTERVIEW_ERROR: "ADD_INTERVIEW_ERROR",
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

  AUTH_LOAD_V5_USER_PROFILE: "AUTH_LOAD_V5_USER_PROFILE",
  AUTH_LOAD_V5_USER_PROFILE_PENDING: "AUTH_LOAD_V5_USER_PROFILE_PENDING",
  AUTH_LOAD_V5_USER_PROFILE_SUCCESS: "AUTH_LOAD_V5_USER_PROFILE_SUCCESS",
  AUTH_LOAD_V5_USER_PROFILE_ERROR: "AUTH_LOAD_V5_USER_PROFILE_ERROR",

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

  /*
    Searched Roles
  */
  CLEAR_SEARCHED_ROLES: "CLEAR_SEARCHED_ROLES",
  ADD_SEARCHED_ROLE: "ADD_SEARCHED_ROLE",
  ADD_ROLE_SEARCH_ID: "ADD_ROLE_SEARCH_ID",
  DELETE_SEARCHED_ROLE: "DELETE_SEARCHED_ROLE",

  /*
   * matching role
   */
  ADD_MATCHING_ROLE: "ADD_MATCHING_ROLE",
  DELETE_MATCHING_ROLE: "DELETE_MATCHING_ROLE",
  EDIT_MATCHING_ROLE: "EDIT_MATCHING_ROLE",

  /**
   * team object
   */
  ADD_TEAM_OBJECT: "ADD_TEAM_OBJECT",

  /*
   * global loading state
   */
  SET_IS_LOADING: "SET_IS_LOADING",
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
 * resourceType options
 */
export const RESOURCE_TYPE_OPTIONS = [
  { value: null, label: "" },
  { value: "designer", label: "Designer" },
  { value: "software-developer", label: "Software Developer" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "data-engineer", label: "Data Engineer" },
];

/**
 * job status options
 */
export const JOB_STATUS_OPTIONS = [
  { value: "sourcing", label: "sourcing" },
  { value: "in-review", label: "in-review" },
  { value: "assigned", label: "assigned" },
  { value: "closed", label: "closed" },
  { value: "cancelled", label: "cancelled" },
];

/**
 * resource booking status options
 */
export const RESOURCE_BOOKING_STATUS_OPTIONS = [
  { value: "placed", label: "placed" },
  { value: "closed", label: "closed" },
  { value: "cancelled", label: "cancelled" },
];

/*
 * show error message below the markdown editor when the markedown editor is disabled
 */
export const DISABLED_DESCRIPTION_MESSAGE =
  "You may not edit a Job Description that is currently posted to Topcoder.com. Please contact support@topcoder.com.";

/*
 * the disabled reason show in the tooltip
 */
export const DISABLED_SCHEDULE_INTERVIEW =
  "You've reached the maximum allowed number (3) of interviews for this candidate.";

/**
 * The media URL to be shown on Interview popup
 */
export const INTERVIEW_POPUP_MEDIA_URL =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const MAX_ALLOWED_INTERVIEWS = 3;

/**
 * Custom role names to remove from RoleList component
 */
export const CUSTOM_ROLE_NAMES = ["custom", "niche"];

/**
 * Minimal Resource Booking duration (weeks)
 */
export const MIN_DURATION = 4;

/**
 * Maximum allowed numbers of selecter skills for search.
 */
export const MAX_SELECTED_SKILLS = 3;

/**
 * Milliseconds for each stage of role search
 * There are 3 stages, so total search takes 3x this number
 */
export const SEARCH_STAGE_TIME = 1500;

/**
 * These are the stages of the interview scheduling popup
 */
export const POPUP_STAGES = {
  SCHEDULE_INTERVIEW: "scheduleInterview",
  CONNECT_CALENDAR: "connectCalendar",
  MANAGE_CALENDAR: "manageCalendar",
  MANAGE_AVAILABILITY: "manageAvailability",
  SELECT_DURATION: "selectDuration",
  SEND_INTERVIEW_INVITE: "sendInterviewInvite",
  SUCCESS: "sucess",
  CALENDAR_SYNC_TIMED_OUT: "calendarSyncTimedOut",
  CLOSE: "close",
};

/**
 * These are the states supported by the schedule interview pop up supports
 */
export const INTERVIEW_POPUP_STAGES = [
  {
    id: POPUP_STAGES.SCHEDULE_INTERVIEW,
    title: "Schedule Interview",
  },
  {
    id: POPUP_STAGES.CONNECT_CALENDAR,
    title: "Connect your calendar",
  },
  {
    id: POPUP_STAGES.MANAGE_CALENDAR,
    title: "Manage Connected calendar",
  },
  {
    id: POPUP_STAGES.MANAGE_AVAILABILITY,
    title: "Manage Availability",
    isCenterAligned: true,
  },
  {
    id: POPUP_STAGES.SELECT_DURATION,
    title: "Select Duration",
    isCenterAligned: true,
  },
  {
    id: POPUP_STAGES.SEND_INTERVIEW_INVITE,
    title: "Send Interview Invite",
    isCenterAligned: true,
  },
  {
    id: POPUP_STAGES.SUCCESS,
    title: "Success! Interview invite sent",
  },
  {
    id: POPUP_STAGES.CALENDAR_SYNC_TIMED_OUT,
    title: "Send Interview Invite",
  },
];

/**
 * These are the list of steps in the schedule interview phase
 */
export const SCHEDULE_INTERVIEW_STEPS = [
  {
    id: "availability",
    label: "Availability",
  },
  {
    id: "selectType",
    label: "Select Type",
  },
  {
    id: "confirm",
    label: "Confirm",
  },
];

/**
 * The list of time zones which lists in interview scheduler popup
 */
export const TIME_ZONES = [
  "America/Los_Angeles",
  "America/Chicago",
  "America/Denver",
  "America/New_York",
  "Pacific/Midway",
  "Pacific/Niue",
  "Pacific/Pago_Pago",
  "Pacific/Samoa",
  "Pacific/Honolulu",
  "Pacific/Tahiti",
  "Pacific/Marquesas",
  "America/Adak",
  "Pacific/Gambier",
  "America/Anchorage",
  "America/Metlakatla",
  "Pacific/Pitcairn",
  "America/Phoenix",
  "America/Tijuana",
  "America/Whitehorse",
  "Etc/GMT+7",
  "America/Chihuahua",
  "America/Managua",
  "America/Mazatlan",
  "Canada/Saskatchewan",
  "Pacific/Easter",
  "Pacific/Galapagos",
  "America/Bogota",
  "America/Lima",
  "America/Mexico_City",
  "America/Monterrey",
  "America/Panama",
  "America/Asuncion",
  "America/Campo_Grande",
  "America/Caracas",
  "America/Grand_Turk",
  "America/Havana",
  "America/La_Paz",
  "America/Port-au-Prince",
  "America/Santiago",
  "America/Santo_Domingo",
  "America/Buenos_Aires",
  "America/Fortaleza",
  "America/Halifax",
  "America/Sao_Paulo",
  "Antarctica/Palmer",
  "Canada/Atlantic",
  "America/St_Johns",
  "Canada/Newfoundland",
  "America/Godthab",
  "America/Miquelon",
  "America/Noronha",
  "Atlantic/Cape_Verde",
  "Africa/Abidjan",
  "Africa/Monrovia",
  "Africa/Sao_Tome",
  "Atlantic/Azores",
  "UTC",
  "Africa/Algiers",
  "Africa/Casablanca",
  "Africa/Lagos",
  "Etc/GMT-1",
  "Europe/Dublin",
  "Europe/Lisbon",
  "Europe/London",
  "Africa/Cairo",
  "Africa/Harare",
  "Africa/Johannesburg",
  "Africa/Juba",
  "Africa/Khartoum",
  "Africa/Maputo",
  "Africa/Windhoek",
  "Antarctica/Troll",
  "Etc/GMT-2",
  "Europe/Amsterdam",
  "Europe/Belgrade",
  "Europe/Berlin",
  "Europe/Bratislava",
  "Europe/Brussels",
  "Europe/Budapest",
  "Europe/Copenhagen",
  "Europe/Ljubljana",
  "Europe/Madrid",
  "Europe/Paris",
  "Europe/Prague",
  "Europe/Rome",
  "Europe/Sarajevo",
  "Europe/Skopje",
  "Europe/Stockholm",
  "Europe/Vienna",
  "Europe/Warsaw",
  "Europe/Zagreb",
  "MET",
  "Africa/Nairobi",
  "Asia/Amman",
  "Asia/Baghdad",
  "Asia/Beirut",
  "Asia/Damascus",
  "Asia/Famagusta",
  "Asia/Gaza",
  "Asia/Jerusalem",
  "Asia/Kuwait",
  "Asia/Riyadh",
  "Europe/Athens",
  "Europe/Bucharest",
  "Europe/Chisinau",
  "Europe/Helsinki",
  "Europe/Istanbul",
  "Europe/Minsk",
  "Europe/Moscow",
  "Europe/Riga",
  "Europe/Sofia",
  "Europe/Tallinn",
  "Europe/Vilnius",
  "Europe/Volgograd",
  "Asia/Baku",
  "Asia/Dubai",
  "Asia/Muscat",
  "Asia/Tbilisi",
  "Asia/Yerevan",
  "Europe/Saratov",
  "Europe/Ulyanovsk",
  "Asia/Kabul",
  "Asia/Tehran",
  "Asia/Karachi",
  "Asia/Qyzylorda",
  "Asia/Tashkent",
  "Asia/Yekaterinburg",
  "Asia/Calcutta",
  "Asia/Colombo",
  "Asia/Kolkata",
  "Asia/Kathmandu",
  "Asia/Katmandu",
  "Asia/Almaty",
  "Asia/Dhaka",
  "Asia/Urumqi",
  "Asia/Rangoon",
  "Asia/Bangkok",
  "Asia/Barnaul",
  "Asia/Hovd",
  "Asia/Jakarta",
  "Asia/Krasnoyarsk",
  "Asia/Novosibirsk",
  "Asia/Tomsk",
  "Asia/Chongqing",
  "Asia/Hong_Kong",
  "Asia/Irkutsk",
  "Asia/Kuala_Lumpur",
  "Asia/Makassar",
  "Asia/Manila",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Taipei",
  "Asia/Ulaanbaatar",
  "Asia/Ulan_Bator",
  "Australia/Perth",
  "Australia/Eucla",
  "Asia/Chita",
  "Asia/Jayapura",
  "Asia/Pyongyang",
  "Asia/Seoul",
  "Asia/Tokyo",
  "Asia/Yakutsk",
  "Australia/Adelaide",
  "Australia/Darwin",
  "Asia/Vladivostok",
  "Australia/Brisbane",
  "Australia/Canberra",
  "Australia/Hobart",
  "Australia/Melbourne",
  "Australia/Sydney",
  "Pacific/Guam",
  "Pacific/Port_Moresby",
  "Australia/Lord_Howe",
  "Antarctica/Casey",
  "Asia/Magadan",
  "Asia/Sakhalin",
  "Pacific/Bougainville",
  "Pacific/Norfolk",
  "Asia/Kamchatka",
  "Pacific/Auckland",
  "Pacific/Fiji",
  "Pacific/Kwajalein",
  "Pacific/Chatham",
  "Pacific/Apia",
  "Pacific/Fakaofo",
  "Pacific/Tongatapu",
  "Pacific/Kiritimati",
];

/**
 * Days mapping
 */
export const DAYS = {
  U: "S",
  M: "M",
  T: "T",
  W: "W",
  R: "T",
  F: "F",
  S: "S",
};

/**
 * These are the default selected days
 */
export const DEFAULT_SELECTED_DAYS = ["M", "T", "W", "R", "F"];

/**
 * Used to sign `state` when connecting calendars using Nylas
 * It should match the same in TaaS API
 * Actually it's not secret, we just use JWT to compress data not to secure it
 */
export const NYLAS_CONNECT_CALENDAR_JWT_SECRET = "secret";

/*
 * connecting calendar switcher
 */
export const ALLOW_CONNECTING_CALENDAR = false
