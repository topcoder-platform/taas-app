/**
 * Team access page actions
 */

import {
  getTeamMembers,
  getTeamInvitees,
  deleteTeamMember,
  postMembers,
} from "services/teams";
import { ACTION_TYPE } from "constants";

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
  type: ACTION_TYPE.RESET_MEMBERS_STATE,
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
