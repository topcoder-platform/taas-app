/**
 * Team access page actions
 */

import {
  getTeamMembers,
  getTeamInvitees,
  deleteTeamMember,
  getMemberSuggestions,
  postMembers,
} from "services/teams";

export const ACTION_TYPE = {
  LOAD_MEMBERS: "LOAD_MEMBERS",
  LOAD_MEMBERS_PENDING: "LOAD_MEMBERS_PENDING",
  LOAD_MEMBERS_SUCCESS: "LOAD_MEMBERS_SUCCESS",
  LOAD_MEMBERS_ERROR: "LOAD_MEMBERS_ERROR",
  LOAD_INVITES: "LOAD_INVITES",
  LOAD_INVITES_PENDING: "LOAD_INVITES_PENDING",
  LOAD_INVITES_SUCCESS: "LOAD_INVITES_SUCCESS",
  LOAD_INVITES_ERROR: "LOAD_INVITES_ERROR",
  LOAD_SUGGESTIONS: "LOAD_SUGGESTIONS",
  LOAD_SUGGESTIONS_PENDING: "LOAD_SUGGESTIONS_PENDING",
  LOAD_SUGGESTIONS_SUCCESS: "LOAD_SUGGESTIONS_SUCCESS",
  LOAD_SUGGESTIONS_ERROR: "LOAD_SUGGESTIONS_ERROR",
  REMOVE_MEMBER: "REMOVE_MEMBER",
  REMOVE_MEMBER_PENDING: "REMOVE_MEMBER_PENDING",
  REMOVE_MEMBER_SUCCESS: "REMOVE_MEMBER_SUCCESS",
  REMOVE_MEMBER_ERROR: "REMOVE_MEMBER_ERROR",
  ADD_MEMBERS: "ADD_MEMBERS",
  ADD_MEMBERS_PENDING: "ADD_MEMBERS_PENDING",
  ADD_MEMBERS_SUCCESS: "ADD_MEMBERS_SUCCESS",
  ADD_MEMBERS_ERROR: "ADD_MEMBERS_ERROR",
  CLEAR_ALL: "CLEAR_ALL",
  CLEAR_SUGGESTIONS: "CLEAR_SUGGESTIONS",
};

/**
 * Loads team members
 *
 * @param {string|number} teamId
 *
 * @returns {Promise} loaded members or error
 */
export const loadMembers = (teamId) => ({
  type: ACTION_TYPE.LOAD_MEMBERS,
  payload: async () => {
    const res = await getTeamMembers(teamId);
    return res.data;
  },
  meta: {
    teamId,
  },
});

/**
 * Loads team invites
 *
 * @param {string|number} teamId
 *
 * @returns {Promise} loaded invitees or error
 */
export const loadInvites = (teamId) => ({
  type: ACTION_TYPE.LOAD_INVITES,
  payload: async () => {
    const res = await getTeamInvitees(teamId);
    return res.data;
  },
  meta: {
    teamId,
  },
});

/**
 * Clear team members state
 */
export const clearAll = () => ({
  type: ACTION_TYPE.CLEAR_ALL,
});

/**
 * Removes a team member
 *
 * @param {string|number} teamId
 * @param {string|number} memberId
 *
 * @returns {Promise} deleted member's id or error
 */
export const removeTeamMember = (teamId, memberId) => ({
  type: ACTION_TYPE.REMOVE_MEMBER,
  payload: async () => {
    const res = await deleteTeamMember(teamId, memberId);
    return res.data;
  },
  meta: {
    teamId,
    memberId,
  },
});

/**
 * Loads suggestions for invites
 *
 * @param {string} fragment
 *
 * @returns {Promise<object[]>} list of suggestions or error
 */
export const loadSuggestions = (fragment) => ({
  type: ACTION_TYPE.LOAD_SUGGESTIONS,
  payload: async () => {
    const res = await getMemberSuggestions(fragment);
    return res.data.result.content;
  },
  meta: {
    fragment,
  },
});

/**
 * Clears invite suggestions
 */
export const clearSuggestions = () => ({
  type: ACTION_TYPE.CLEAR_SUGGESTIONS,
});

/**
 * Adds members to team
 *
 * @param {string|number} teamId
 * @param {string[]} handles
 * @param {string[]} emails
 *
 * @returns {Promise} list of successes and failures, or error
 */
export const addMembers = (teamId, handles, emails) => ({
  type: ACTION_TYPE.ADD_MEMBERS,
  payload: async () => {
    const res = await postMembers(teamId, handles, emails);
    return res.data;
  },
});
