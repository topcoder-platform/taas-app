/**
 * Format utilities
 */
import _ from "lodash";
import { RATE_TYPE } from "constants";
import { EMAIL_REQUEST_EXTENSION, CONNECT_WEBSITE_URL } from "../../config";
import moment from "moment";
import { DAY_FORMAT, DATE_WITH_TIME_FORMAT } from "constants/";

/**
 * Format URL to the project (team) in Connect App.
 *
 * @param {string|number} teamId team (project) id
 *
 * @returns {string} URL to Connect project
 */
export const formatConnectProjectUrl = (teamId) =>
  `${CONNECT_WEBSITE_URL}/projects/${teamId}`;

/**
 * Formats number with base word in singular or plural form depend on the number.
 *
 * @param {number} num number
 * @param {string} baseWord base word
 *
 * @returns {string} formatted number with word
 */
export const formatPlural = (num, baseWord) =>
  `${num} ${baseWord}${num > 1 ? "s" : ""}`;

/**
 * Formats remaining time until the date `endDate` in weeks.
 * If remaining time is less than a week, then formats time in smaller units like days, hours, minutes.
 * If time is up, then return `Time is up`.
 *
 * @param {string|moment.Moment} endDate end date
 * @param {string} timeIsAppText text to show when time is up
 *
 * @returns {string} formatted remaining time
 */
export const formatRemainingTime = (endDate, timeIsAppText = "Time is up") => {
  const precisions = ["week", "day", "hour", "minute"];

  for (let i = 0; i < precisions.length; i++) {
    const precision = precisions[i];
    const leftTime = moment(endDate).diff(moment(), precision);

    if (leftTime >= 1) {
      return formatPlural(leftTime, precision);
    }
  }

  return timeIsAppText;
};

/**
 * Format remaining time for team.
 *
 * @param {object} team team
 *
 * @returns {string} formatted time
 */
export const formatRemainingTimeForTeam = (team) => {
  const hasResource = _.get(team, "resources", []).length > 0;
  return team.endDate
    ? formatRemainingTime(team.endDate, hasResource ? "Time is up" : "TBD")
    : "TBD";
};

/**
 * Format money separating every 3 digits with comma.
 *
 * @param {number} value money value
 * @param {string} currency currency symbol
 *
 * @returns {string} formatted money value
 */
export const formatMoney = (value, currency = "$") => {
  value = value ?? 0;
  return currency + new Intl.NumberFormat().format(value);
};

/**
 * Convert rate value from one type to another one.
 *
 * Supported rate types are defined by `RATE_TYPE`.
 *
 * @param {number} value rate value
 * @param {string} sourceRate source rate type
 * @param {string} targetRate target rate type
 *
 * @returns {number} rate value in target rate type
 */
export const convertRate = (value, sourceRate, targetRate) => {
  const hoursInRate = {
    [RATE_TYPE.HOURLY]: 1,
    [RATE_TYPE.DAILY]: 24,
    [RATE_TYPE.WEEKLY]: 24 * 7,
    [RATE_TYPE.MONTHLY]: 24 * 30, // 30 is average month days
  };

  const hourlyRate = value / hoursInRate[sourceRate];
  return hourlyRate * hoursInRate[targetRate];
};

/**
 * Format full name.
 *
 * @param {string} firstName first name
 * @param {string} lastName last name
 *
 * @returns {string} full name
 */
export const formatFullName = (firstName, lastName) => {
  let fullName = "";

  if (firstName && lastName) {
    fullName = firstName + " " + lastName;
  } else if (firstName || lastName) {
    fullName = firstName || lastName;
  }

  return fullName;
};

/**
 * Formats popup options for reports
 * @param {string} teamName Team name
 * @param {string} memberHandle Member Handle
 *
 * @returns {Object} Popup Options
 */
export const formatReportPopup = (teamName, memberHandle) => {
  return {
    title: `Issue Report - ${teamName}${
      !!memberHandle ? " - " + memberHandle : ""
    }`,
    textPlaceholder: "Describe your issue",
    textDataField: "data.reportText",
    successTitle: "Report submitted successfully",
    errorTitle: "Report failed",
  };
};

/**
 * Formats popup options for extension requests
 * @param {string} teamName Team name
 * @param {string} memberHandle Member Handle
 *
 * @returns {Object} Popup Options
 */
export const formatExtensionPopup = (teamName, memberHandle) => {
  return {
    title: `Extension Request - ${teamName}${
      memberHandle ? " - " + memberHandle : ""
    }`,
    textPlaceholder: "Add any comments...",
    textDataField: "data.text",
    successTitle: "Extension request submitted successfully",
    errorTitle: "Extension request failed",
  };
};

/**
 * Formats data for sending email reports
 * @param {string} teamName Team name
 * @param {string|number} teamId Team ID
 * @param {string} memberHandle Member handle
 *
 * @returns {Object} Data object for report
 */
export const formatReportData = (teamName, teamId, memberHandle) => {
  const data = {
    template: "team-issue-report",
    data: {
      projectName: teamName,
      projectId: teamId,
    },
  };

  if (!!memberHandle) {
    _.set(data, "template", "member-issue-report");
    _.set(data, "data.userHandle", memberHandle);
  }

  return data;
};

/**
 * Formats data for sending email extension requests
 * @param {string} teamName Team name
 * @param {string|number} teamId Team ID
 * @param {string} memberHandle Member handle
 *
 * @returns {Object} Data object for extension request
 */
export const formatExtensionData = (teamName, teamId, memberHandle) => {
  const data = {
    template: "extension-request",
    data: {
      projectName: teamName,
      projectId: teamId,
    },
  };

  if (!!memberHandle) {
    _.set(data, "data.userHandle", memberHandle);
  }

  return data;
};

/**
 * Form date range
 *
 * @param {string|Date|moment.Moment} startDate start date
 * @param {string|Date|moment.Moment} endDate   end date
 *
 * @returns {string} formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  const startDateStr = startDate ? moment(startDate).format(DAY_FORMAT) : "";
  const endDateStr = endDate ? moment(endDate).format(DAY_FORMAT) : "";

  if (!startDateStr && !endDateStr) {
    return "TBD";
  }

  return `${startDateStr} - ${endDateStr}`;
};

/**
 * Format date
 *
 * @param {string|Date|moment.Moment} date date
 * @param {string} format date/time format
 * @returns {string} formatted date range
 */
export const formatDate = (date, format = DAY_FORMAT) => {
  const dateStr = date ? moment(date).format(format) : "";

  if (!dateStr) {
    return "TBD";
  }

  return `${dateStr}`;
};

/**
 * Format interview date/time.
 *
 * @param {string|Date|moment.Moment} date date
 * @returns {string} formatted date
 */
export const formatInterviewDate = (date) => {
  return formatDate(date, DATE_WITH_TIME_FORMAT);
};

/**
 * Format page title to show in the browser header.
 *
 * @param {string} pageTitle page title
 */
export const formatPageTitle = (pageTitle) => {
  let formattedPageTitle = "TaaS | Topcoder";
  if (pageTitle) {
    formattedPageTitle = pageTitle + " | " + formattedPageTitle;
  }

  return formattedPageTitle;
};

/**
 * Format open positions.
 *
 * @param {Object} job job object
 * @param {Array} resources resource list
 *
 * @returns {string} open positions string
 */
export const formatOpenPositions = (job, resources) => {
  const jobResources = _.filter(resources, { jobId: job.id });
  if (jobResources.length === 0) {
    return `${formatPlural(job.numPositions, "open position")}`;
  } else {
    return `${jobResources.length} / ${formatPlural(
      job.numPositions,
      "open position"
    )}`;
  }
};

/**
 * Format job date
 *
 * @param {string} startDate job startDate
 * @param {number} duration  job duration
 *
 * @returns {string} formatted string
 */
export const formatJobDate = (startDate, duration) => {
  const dateStr = startDate ? moment(startDate).format(DAY_FORMAT) : "";

  if (startDate && duration) {
    return `Requested starting ${dateStr} for ${formatPlural(
      duration,
      "week"
    )}`;
  } else if (startDate) {
    return `Requested starting ${dateStr}`;
  } else if (duration) {
    return formatPlural(duration, "week");
  }
  return "TBD";
};

/**
 * Format localTime
 *
 * @param {moment.Moment} localTime
 *
 * @returns {string} formatted localTime
 */
export const formatLocalTime = (localTime) => {
  return localTime.format("h:mm a");
};

/**
 * Get and format utc offset from localTime
 *
 * @param {moment.Moment} localTime
 *
 * @returns {string} UTC offset
 *
 */
export const formatTimeOffset = (localTime) => {
  const utcOff = localTime.utcOffset() / 60;
  return "UTC" + moment().utcOffset(utcOff).format("Z");
};

/**
 * Format working hours
 *
 * @param {string} time
 *
 * @returns {string} formatted time
 *
 */
export const formatWorkTime = (time) => {
  return moment({ hour: time.split(":")[0] }).format("h a");
};

/**
 * Format invite time
 *
 * @param {string} invite created timestamp
 *
 * @returns {string} formatted date
 */
export const formatInviteTime = (time) => {
  return moment(time).format("MMM D, YY");
};

/**
 * Format number as 2 digits:
 *  7 -> 07
 * 07 -> 07
 *
 * @param {number|string} value 1 or 2 digits number to format
 * @returns {string} formatted 2-digits number
 */
export const formatAs2Digits = (number) => {
  const str = number.toString();

  if (str.length < 2) {
    return "0" + str;
  }

  return str;
};
