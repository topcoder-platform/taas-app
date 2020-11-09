/**
 * Topcoder Teams Service
 *
 * NOTE: It uses mock at the moment.
 */
import axios from "axios";
import config from "../../config";

/**
 * Get my teams.
 *
 * @returns {Promise<object[]>} list of teams
 */
export const getMyTeams = () => {
  return axios.get(`${config.TC_TEAMS_SERVICE_URL}/taas-teams`);
};

/**
 * Get team by id.
 *
 * @param {string|number} teamId team id
 *
 * @returns {Promise<{}>} team object
 */
export const getTeamById = (teamId) => {
  return axios.get(`${config.TC_TEAMS_SERVICE_URL}/taas-teams/${teamId}`);
};

/**
 * Get team position details.
 *
 * @param {string|number} teamId team id
 * @param {string|number} positionId position id
 *
 * @returns {Promise<object{}>} job object
 */
export const getPositionDetails = (teamId, positionId) => {
  return axios.get(
    `${config.TC_TEAMS_SERVICE_URL}/taas-teams/${teamId}/jobs/${positionId}`
  );
};
