/**
 * Format utilities
 */
import { RATE_TYPE } from "constants";
import { EMAIL_REPORT_ISSUE } from "../../config";
import moment from "moment";

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
 *
 * @returns {string} formatted remaining time
 */
export const formatRemainingTime = (endDate) => {
  const precisions = ["week", "day", "hour", "minute"];

  for (let i = 0; i < precisions.length; i++) {
    const precision = precisions[i];
    const leftTime = moment(endDate).diff(moment(), precision);

    if (leftTime >= 1) {
      return formatPlural(leftTime, precision);
    }
  }

  return "Time is up";
};

/**
 * Format money separating every 3 digits with comma.
 *
 * @param {number} value money value
 * @param {string} currency currency symbol
 *
 * @returns {string} formatted money value
 */
export const formatMoney = (value, currency = "$") =>
  currency + new Intl.NumberFormat().format(value);

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
 * Format rate as weekly.
 *
 * @param {number} value rate value
 * @param {string} rateType rate type
 * @param {string} currency currency symbol
 */
export const formatRate = (value, rateType, currency = "$") =>
  formatMoney(convertRate(value, rateType, RATE_TYPE.WEEKLY), currency);

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
