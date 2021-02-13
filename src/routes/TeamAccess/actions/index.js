/**
 * Team access page actions
 */

import {
  getTeamMembers,
  getTeamInvitees,
  deleteTeamMember,
  deleteInvite,
  getMemberSuggestions,
  postInvites
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
  REMOVE_INVITE: "REMOVE_INVITE",
  REMOVE_INVITE_PENDING: "REMOVE_INVITE_PENDING",
  REMOVE_INVITE_SUCCESS: "REMOVE_INVITE_SUCCESS",
  REMOVE_INVITE_ERROR: "REMOVE_INVITE_ERROR",
  ADD_INVITES: "ADD_INVITES",
  ADD_INVITES_PENDING: "ADD_INVITES_PENDING",
  ADD_INVITES_SUCCESS: "ADD_INVITES_SUCCESS",
  ADD_INVITES_ERROR: "ADD_INVITES_ERROR",
  CLEAR_ALL: "CLEAR_ALL",
  CLEAR_SUGGESTIONS: "CLEAR_SUGGESTIONS"
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
 * Removes an invite
 *
 * @param {string|number} teamId
 * @param {string|number} REMOVE_INVITE_PENDING
 * 
 * @returns {Promise} deleted invite id or error
 */
export const removeInvite = (teamId, inviteId) => ({
  type: ACTION_TYPE.REMOVE_INVITE,
  payload: async () => {
    const res = await deleteInvite(teamId, inviteId);
    return res.data;
  },
  meta: {
    teamId,
    inviteId,
  },
});

/**
 * Loads suggestions for invites
 * 
 * @param {string} fragment
 * 
 * @returns {Promise<object[]>} list of suggestions or error 
 */
export const loadSuggestions = fragment => ({
  type: ACTION_TYPE.LOAD_SUGGESTIONS,
  payload: async () => {
    const res = await getMemberSuggestions(fragment);
    return res.data.result.content;
  },
  meta: {
    fragment
  }
})

/**
 * Clears invite suggestions
 */
export const clearSuggestions = () => ({
  type: ACTION_TYPE.CLEAR_SUGGESTIONS
})

/**
 * Adds invites to team
 * 
 * @param {string|number} teamId
 * @param {string[]} handles
 * @param {string[]} emails
 * 
 * @returns {Promise} list of successes and failures, or error
 */
export const addInvites = (teamId, handles, emails) => ({
  type: ACTION_TYPE.ADD_INVITES,
  payload: async () => {
    const res = await postInvites(teamId, handles, emails, "customer");
    return res.data;
  }
})