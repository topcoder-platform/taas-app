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
  return axios.get(`${config.TC_TEAMS_SERVICE_URL}/teams`);
};

/**
 * Get team by id.
 *
 * @param {string|number} teamId team id
 *
 * @returns {Promise<{}>} list of teams
 */
export const getTeamById = (teamId) => {
  return axios.get(`${config.TC_TEAMS_SERVICE_URL}/teams/${teamId}`);
};
