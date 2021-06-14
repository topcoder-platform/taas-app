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
    // wrap with quotes to fix issue https://github.com/topcoder-platform/taas-app/issues/46
    query += `&name="${name}"`;
  }

  return axios.get(`${config.API.V5}/taas-teams?${query}`);
};

/**
 * Get v5 user profile.
 *
 * @returns {Promise<{}>} user profile object
 */
export const getV5UserProfile = () => {
  return axios.get(`${config.API.V5}/taas-teams/me`);
};

/**
 * Get skills by job description
 * @param {string} description
 * @returns {Promise<{}>} skills list
 */
export const getSkillsByJobDescription = (description) => {
  return axios.post(`${config.API.V5}/taas-teams/getSkillsByJobDescription`, {
    description,
  });
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
 * Patch New Candidate Interview
 *
 * @param {string} candidateId interview candidate id
 * @param {object} interviewData emails and interview length
 * @returns {Promise<object>} interview object
 */
export const patchCandidateInterview = (candidateId, interviewData) => {
  return axios.patch(
    `${config.API.V5}/jobCandidates/${candidateId}/requestInterview`,
    interviewData
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

/**
 * Post new project
 *
 * @returns {Promise<object>} project object
 */
export const postProject = () => {
  const url = `${config.API.V5}/taas-teams/createTeamRequest`;

  const bodyObj = {
    name: `project-${Date()}`,
    type: "talent-as-a-service",
  };

  return axios.post(url, bodyObj);
};
