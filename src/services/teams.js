/**
 * Topcoder TaaS Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

/**
 * Get my teams.
 * @param {string|number}  name    team name
 * @param {number}         page    current page
 * @param {number}         perPage perPage
 *
 * @returns {Promise<object[]>} list of teams
 */
export const getMyTeams = (name, page = 1, perPage) => {
  let query = `page=${page}&perPage=${perPage}`;
  if (name) {
    query += `&name=*${name}*`; // wrap with asterisks to search by substrings
  }

  return axios.get(`${config.API.V5}/taas-teams?${query}`);
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

/**
 * Get Team Members
 *
 * @param {string|number} teamId team id
 *
 * @returns {Promise<object[]>} list of team members
 */
export const getTeamMembers = (teamId) => {
  return axios.get(
    `${config.API.V5}/projects/${teamId}/members/` +
      "?fields=id,userId,role,createdAt,updatedAt,createdBy,updatedBy" +
      ",handle,photoURL,workingHourStart,workingHourEnd,timeZone,email"
  );
};

/**
 * Get Team Invitees
 *
 * @param {string|number} teamId team id
 *
 * @returns {Promise<object[]>} list of team invitees
 */
export const getTeamInvitees = (teamId) => {
  return axios.get(
    `${config.API.V5}/projects/${teamId}/invites/` +
      "?fields=id,projectId,userId,email,role,status,createdAt,updatedAt" +
      ",createdBy,updatedBy,handle"
  );
};

/**
 * Delete Team Member
 *
 * @param {string|number} teamId team id
 * @param {string|number} memberId member id
 *
 * @returns {Promise<memberId>} memberId
 */
export const deleteTeamMember = (teamId, memberId) => {
  const url = `${config.API.V5}/projects/${teamId}/members/${memberId}/`;
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(() => resolve({ data: memberId }))
      .catch((ex) => reject(ex));
  });
};

/**
 * Delete Invite
 *
 * @param {string|number} teamId team id
 * @param {string|number} inviteId invite id
 *
 * @returns {Promise} inviteId or error
 */
export const deleteInvite = (teamId, inviteId) => {
  const url = `${config.API.V5}/projects/${teamId}/invites/${inviteId}`;
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(() => resolve({ data: inviteId }))
      .catch((ex) => reject(ex));
  });
};
