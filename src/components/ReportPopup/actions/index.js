/**
 * Report popup actions
 */
import { ACTION_TYPE } from "constants";

/**
 * Action to populate the report info and open a report popup
 * @param {string} teamName Team name
 * @param {string|number} teamId Tead ID
 * @param {string} memberHandle Member handle
 */
export const openReport = (teamName, teamId, memberHandle) => ({
  type: ACTION_TYPE.OPEN_REPORT,
  payload: { teamName, teamId, memberHandle },
});

/**
 * Action to close a report popup
 */
export const closeReport = () => ({
  type: ACTION_TYPE.CLOSE_REPORT,
});
