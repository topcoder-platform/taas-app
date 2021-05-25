/**
 * Auth User actions
 */
import { ACTION_TYPE } from "constants";
import { getTeamMembers, getV5UserProfile } from "services/teams";

/**
 * Action to set auth user data
 *
 * @param {object} tokenData user data from token
 */
export const authUserSuccess = (tokenData) => ({
  type: ACTION_TYPE.AUTH_USER_SUCCESS,
  payload: tokenData,
});

/**
 * Action to set auth user error
 */
export const authUserError = (error) => ({
  type: ACTION_TYPE.AUTH_USER_ERROR,
  payload: error,
});

/**
 * Loads team members for authentication/permission purposes
 *
 * @param {string|number} teamId
 *
 * @returns {Promise} loaded members or error
 */
export const authLoadTeamMembers = (teamId) => ({
  type: ACTION_TYPE.AUTH_LOAD_TEAM_MEMBERS,
  payload: async () => {
    const res = await getTeamMembers(teamId);
    return res.data;
  },
  meta: {
    teamId,
  },
});

/**
 * Loads v5 user profile for authentication/permission purposes
 *
 * @returns {Promise} loaded user profile
 */
export const authLoadV5UserProfile = () => ({
  type: ACTION_TYPE.AUTH_LOAD_V5_USER_PROFILE,
  payload: async () => {
    const res = await getV5UserProfile();
    return res.data;
  },
});

/**
 * Clear team members for authentication/permission purposes
 *
 * We need this if we are going to some route which doesn't have `teamId`
 */
export const authClearTeamMembers = () => ({
  type: ACTION_TYPE.AUTH_CLEAR_TEAM_MEMBERS,
});
