/**
 * State for PositionDetails page
 */
import { useCallback, useEffect, useLayoutEffect } from "react";
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
    return () => dispatch(resetPositionState());
  }, [dispatch, teamId, positionId]);

  // if position.shouldRefreshData is true, reload position details
  useEffect(() => {
    if (state.position && state.position.shouldRefreshData) {
      dispatch(loadPosition(teamId, positionId));
    }
  }, [state, teamId, positionId, dispatch]);

  // bind actions to dispatch method
  const updateCandidateCallback = useCallback(
    (candidateId, partialCandidateData) =>
      dispatch(updateCandidate(candidateId, partialCandidateData)),
    [dispatch]
  );

  return { state, updateCandidate: updateCandidateCallback };
};
