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
 * Post an issue report
 *
 * @param {string} teamName team name
 * @param {string|number} teamId team id
 * @param {string} memberHandle member handle
 */
export const postReport = (teamName, teamId, reportText, memberHandle) => {
  const url = `${config.API.V5}/taas-teams/email`;
  const bodyObj = {
    template: "team-issue-report",
    data: {
      projectName: teamName,
      projectId: teamId,
      reportText,
    },
  };

  if (memberHandle) {
    (bodyObj.template = "member-issue-report"),
      (bodyObj.data.userHandle = memberHandle);
  }

  return axios.post(url, bodyObj);
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
  const url = `${config.API.V5}/taas-teams/${teamId}/members`;
  const bodyObj = {
    handles: [],
    emails: [],
  };
  if (handles && handles.length > 0) {
    bodyObj.handles = handles;
  }
  if (emails && emails.length > 0) {
    bodyObj.emails = emails;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(url, bodyObj, {
        validateStatus: (status) =>
          (status >= 200 && status < 300) || status === 403,
      })
      .then((res) => resolve(res))
      .catch((ex) => reject(ex));
  });
};
