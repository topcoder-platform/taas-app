/**
 * Topcoder TaaS Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

/**
 * Get my teams.
 *
 * @returns {Promise<object[]>} list of teams
 */
export const getMyTeams = () => {
  debugger;
  return axios.get(`${config.API.V5}/taas-teams`);
};

/**
 * Get team by id.
 *
 * @param {string|number} teamId team id
 *
 * @returns {Promise<{}>} team object
 */
export const getTeamById = (teamId) => {
  return axios.get(`${config.API.V5}/taas-teams/${teamId}`);
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
  return axios.get(`${config.API.V5}/taas-teams/${teamId}/jobs/${positionId}`);
};

/**
 * Patch Position Candidate
 *
 * @param {string} candidateId position candidate id
 *
 * @returns {Promise<object{}>} position candidate
 */
export const patchPositionCandidate = (candidateId, partialCandidateData) => {
  return axios.patch(
    `${config.API.V5}/jobCandidates/${candidateId}`,
    partialCandidateData
  );
};
