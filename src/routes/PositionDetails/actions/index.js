/**
 * Position Details page actions
 */
import _ from "lodash";
import {
  getPositionDetails,
  patchPositionCandidate,
  patchCandidateInterview,
} from "services/teams";
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
    const response = await getPositionDetails(teamId, positionId);
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
    const response = await patchPositionCandidate(
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
 * Add interview on server and in Redux store
 *
 * @param {string} candidateId position candidate id
 * @param {object} interviewData data to submit in patch request
 * @returns {object} an interview object
 */
export const addInterview = (candidateId, interviewData) => ({
  type: ACTION_TYPE.ADD_INTERVIEW,
  payload: async () => {
    const response = await patchCandidateInterview(candidateId, interviewData);

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
});
