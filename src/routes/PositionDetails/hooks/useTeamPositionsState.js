/**
 * State for PositionDetails page
 */
import { useCallback, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPosition, updateCandidate, resetPositionState } from "../actions";

/**
 * Hook which provides state for PositionDetails page with all possible actions.
 *
 * @param {string} teamId team id
 * @param {string} positionId position id
 *
 * @returns {{ state: {}, updateCandidate: Function }} PositionDetails page state and possible actions
 */
export const useTeamPositionsState = (teamId, positionId) => {
  const state = useSelector((state) => state.positionDetails);
  const dispatch = useDispatch();

  // load team position details on mount
  useLayoutEffect(() => {
    dispatch(loadPosition(teamId, positionId));

    // clear state when we leave the page
    return () => {
      dispatch(resetPositionState());
    }
  }, [dispatch, teamId, positionId]);

  // bind actions to dispatch method
  const updateCandidateCallback = useCallback(
    (candidateId, partialCandidateData) =>
      dispatch(updateCandidate(candidateId, partialCandidateData)),
    [dispatch]
  );

  return { state, updateCandidate: updateCandidateCallback };
};
