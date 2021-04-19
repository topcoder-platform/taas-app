/**
 * Reducer for PositionDetails page
 */
import _ from "lodash";
import update from "immutability-helper";
import { ACTION_TYPE } from "constants";

const initialState = {
  position: undefined,
  loading: false,
  error: undefined,
};

/**
 * Patch candidate inside position state without state mutation
 *
 * @param {object} state state
 * @param {string} candidateId candidate id
 * @param {object} partialCandidateData partial candidate data
 *
 * @returns {object} new state
 */
const patchCandidateInState = (state, candidateId, partialCandidateData) => {
  const candidateIndex = _.findIndex(_.get(state, "position.candidates"), {
    id: candidateId,
  });

  if (candidateIndex === -1) {
    return state;
  }

  const updatedCandidate = update(state.position.candidates[candidateIndex], {
    $merge: partialCandidateData,
  });

  return update(state, {
    position: {
      candidates: {
        $splice: [[candidateIndex, 1, updatedCandidate]],
      },
    },
  });
};

const patchInterviewInState = (state, candidateId, interviewData) => {
  const candidateIndex = _.findIndex(_.get(state, "position.candidates"), {
    id: candidateId,
  });

  if (candidateIndex === -1) {
    return state;
  }

  const updatedCandidate = update(state.position.candidates[candidateIndex], {
    status: { $set: "interview" },
    interviews: { $push: [interviewData] },
  });

  return update(state, {
    loading: { $set: false },
    error: { $set: undefined },
    position: {
      candidates: {
        $splice: [[candidateIndex, 1, updatedCandidate]],
      },
    },
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.RESET_POSITION_STATE:
      return initialState;

    case ACTION_TYPE.LOAD_POSITION_PENDING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case ACTION_TYPE.LOAD_POSITION_SUCCESS:
      return {
        ...state,
        position: action.payload,
        loading: false,
        error: undefined,
      };

    case ACTION_TYPE.LOAD_POSITION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ACTION_TYPE.UPDATE_CANDIDATE_PENDING:
      return patchCandidateInState(state, action.meta.candidateId, {
        updating: true,
        error: undefined,
      });

    case ACTION_TYPE.UPDATE_CANDIDATE_SUCCESS:
      return patchCandidateInState(state, action.meta.candidateId, {
        updating: false,
        ...action.payload,
      });

    case ACTION_TYPE.UPDATE_CANDIDATE_ERROR:
      return patchCandidateInState(state, action.meta.candidateId, {
        updating: false,
        error: action.payload,
      });

    case ACTION_TYPE.ADD_INTERVIEW_PENDING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case ACTION_TYPE.ADD_INTERVIEW_SUCCESS:
      return patchInterviewInState(state, action.meta.candidateId, {
        ...action.payload,
      });

    case ACTION_TYPE.ADD_INTERVIEW_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
