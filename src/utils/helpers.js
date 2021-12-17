/**
 * Helper utilities
 *
 * This file should contain helper methods which cannot be grouped into a separate file like we did for "format.js".
 * If there are multiple methods which could be grouped into a separate file by their meaning they should be extracted from here to not make this file too big.
 */
import _ from "lodash";
import { validate } from "uuid";

import { CUSTOM_ROLE_NAMES } from "constants/";

/**
 * @param {String} string a possible uuid
 *
 * @returns {Boolean} true if uuid, false if not
 */
export const isUuid = validate;

/**
 * Delay code for some milliseconds using promise.
 *
 * @param {Number} duration duration in milliseconds
 *
 * @returns {Promise<void>} promise
 */
export const delay = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

/**
 * Returns the option from list of option by value
 *
 * @param {any} value value of option
 * @param {[{ label: string, value: any }]} selectOptions list of option
 *
 * @returns {{ label: string, value: any }} select option
 */
export const getSelectOptionByValue = (value, selectOptions) => {
  const option = _.find(selectOptions, { value });

  if (!option) {
    return {
      label: `Unsuppored value: ${value}`,
      value,
    };
  }

  return option;
};

/**
 * Activates the current step in the Completion Box.
 *
 * * Set `isCurrent: true` of the current step.
 * * Set `isCurrent: false` for all other steps.
 * * Set `complete: true` for steps prior to the current.
 * * Set `complete: false` for the steps after the current.
 *
 * @param {Number} currentStepIdx 0-based index of the current step
 * @param {Array} stages stages array
 * @param {Function} setStagesCallback `setStages` callback to update state
 */
export const setCurrentStage = (currentStepIdx, stages, setStagesCallback) => {
  setStagesCallback([
    ...stages
      .slice(0, currentStepIdx)
      .map((s) => ({ ...s, completed: true, isCurrent: false })),
    { ...stages[currentStepIdx], isCurrent: true, completed: false },
    ...stages
      .slice(currentStepIdx + 1)
      .map((s) => ({ ...s, completed: false, isCurrent: false })),
  ]);
};

/**
 * Checks if role is custom/niche
 * @param {Object} role role to check
 * @returns {boolean} whether the role is custom/niche
 */
export const isCustomRole = (role) =>
  !role || !role.name || CUSTOM_ROLE_NAMES.includes(role.name.toLowerCase());

/**
 * Extracts primaryCalendar from UserMeetingSettings object
 * @param {Object} userMeetingSettings UserMeetingSettings instance to check
 * @returns {object} the calendar object which is primary
 */
export const getPrimaryCalendar = (userMeetingSettings) => _.find(userMeetingSettings.nylasCalendars, calendar => calendar.isPrimary);

/**
 * Checks if calendar is synced or not
 * @param {Object} calendar calendar to check
 * @returns {boolean} whether the calendar is in sync or not
 */
export const isCalendarInSync = (calendar) => {
  if (calendar)
    return calendar && calendar.calendarId;
}
