/**
 * Format utilities
 */
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
