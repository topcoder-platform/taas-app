/**
 * Position Details page actions
 */
import { getPositionDetails, patchPositionCandidate } from "services/teams";
import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";
import { ACTION_TYPE } from "constants";

/**
 * Load Team Position details (team job)
 *
 * @param {string} teamId team id
 * @param {string} positionId position id
 *
 * @returns {Promise<any>} loaded data or error
 */
export const loadPosition = (teamId, positionId) => ({
  type: ACTION_TYPE.LOAD_POSITION,
  payload: async () => {
    const tokens = await getAuthUserTokens();
    const response = await getPositionDetails(
      tokens.tokenV3,
      teamId,
      positionId
    );

    return response.data;
  },
  meta: {
    teamId,
    positionId,
  },
});

/**
 * Update candidate on the server and in Redux store
 *
 * @param {string} candidateId position candidate id
 * @param {object} partialCandidateData partial candidate data
 *
 * @returns {Promise} updated candidate data or error
 */
export const updateCandidate = (candidateId, partialCandidateData) => ({
  type: ACTION_TYPE.UPDATE_CANDIDATE,
  payload: async () => {
    const tokens = await getAuthUserTokens();
    const response = await patchPositionCandidate(
      tokens.tokenV3,
      candidateId,
      partialCandidateData
    );

    return response.data;
  },
  meta: {
    candidateId,
  },
});

/**
 * Reset position state
 */
export const resetPositionState = () => ({
  type: ACTION_TYPE.RESET_POSITION_STATE,
})
