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
    `${config.API.V5}/taas-teams/${teamId}/members/` +
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
    `${config.API.V5}/taas-teams/${teamId}/invites/` +
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
  const url = `${config.API.V5}/taas-teams/${teamId}/members/${memberId}/`;
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(() => resolve({ data: memberId }))
      .catch((ex) => reject(ex));
  });
};

/**
 * Get member suggestions
 *
 * @param {string} fragment text for suggestions
 *
 * @returns {Promise}
 */
export const getMemberSuggestions = (fragment) => {
  const url = `${config.API.V3}/members/_suggest/${fragment}`;
  return axios.get(url);
};

/**
 * Post an email
 *
 * @param {Object} data Body object containing template name and email data
 */
export const postEmail = (data) => {
  const url = `${config.API.V5}/taas-teams/email`;

  return axios.post(url, data);
};

/**
 * Post new team members
 *
 * @param {string|number} teamId team id
 * @param {string[]} handles user handles to add
 * @param {string[]} emails user emails to add
 *
 * @returns {Promise<object>} object with successfully added members and failed adds
 */
export const postMembers = (teamId, handles, emails) => {
  const url =
    `${config.API.V5}/taas-teams/${teamId}/members` +
    "?fields=id,userId,role,createdAt,updatedAt,createdBy,updatedBy" +
    ",handle,photoURL,workingHourStart,workingHourEnd,timeZone,email";

  const bodyObj = {};

  if (handles && handles.length > 0) {
    bodyObj.handles = handles;
  }
  if (emails && emails.length > 0) {
    bodyObj.emails = emails;
  }

  return axios.post(url, bodyObj);
};
