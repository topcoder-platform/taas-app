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
 * @param {string} tokenV3 login token
 *
 * @returns {Promise<object[]>} list of teams
 */
export const getMyTeams = (tokenV3) => {
  if (!tokenV3) {
    return Promise.resolve({
      data: null,
    });
  }
  return axios.get(`${config.API.V5}/taas-teams`, {
    headers: { Authorization: `Bearer ${tokenV3}` },
  });
};

/**
 * Get team by id.
 *
 * @param {string} tokenV3 login token
 * @param {string|number} teamId team id
 *
 * @returns {Promise<{}>} team object
 */
export const getTeamById = (tokenV3, teamId) => {
  if (!tokenV3) {
    return Promise.resolve({
      data: null,
    });
  }
  return axios.get(`${config.API.V5}/taas-teams/${teamId}`, {
    headers: { Authorization: `Bearer ${tokenV3}` },
  });
};

/**
 * Get team position details.
 *
 * @param {string} tokenV3 login token
 * @param {string|number} teamId team id
 * @param {string|number} positionId position id
 *
 * @returns {Promise<object{}>} job object
 */
export const getPositionDetails = (tokenV3, teamId, positionId) => {
  if (!tokenV3) {
    return Promise.resolve({
      data: null,
    });
  }
  return axios.get(`${config.API.V5}/taas-teams/${teamId}/jobs/${positionId}`, {
    headers: { Authorization: `Bearer ${tokenV3}` },
  });
};
