/**
 * Format utilities
 */
import _ from "lodash";
import { RATE_TYPE } from "constants";
import {
  EMAIL_REPORT_ISSUE,
  EMAIL_REQUEST_EXTENSION,
  CONNECT_WEBSITE_URL,
} from "../../config";
import moment from "moment";
import { DAY_FORMAT } from "constants/";

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
 * Format Report an Issue URL (mailto:)
 *
 * @param {string} subject email subject
 *
 * @returns {string} report an issue URL
 */
export const formatReportIssueUrl = (subject) => {
  return `mailto:${EMAIL_REPORT_ISSUE}?subject=${encodeURIComponent(subject)}`;
};

/**
 * Format Request an Extension URL (mailto:)
 *
 * @param {string} subject email subject
 *
 * @returns {string} request an extension URL
 */
export const formatRequestExtensionUrl = (subject) => {
  return `mailto:${EMAIL_REQUEST_EXTENSION}?subject=${encodeURIComponent(
    subject
  )}`;
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
 *
 * @returns {string} formatted date range
 */
export const formatDate = (date) => {
  const dateStr = date ? moment(date).format(DAY_FORMAT) : "";

  if (!dateStr) {
    return "TBD";
  }

  return `${dateStr}`;
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
