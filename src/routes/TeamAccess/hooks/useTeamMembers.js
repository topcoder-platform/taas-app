import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadMembers,
  loadInvites,
  clearAll,
  removeTeamMember,
} from "../actions";

/**
 * Hook which provides state and actions
 * for managing team members
 *
 * @param {string|number} teamId team id
 */
export const useTeamMembers = (teamId) => {
  const state = useSelector((state) => state.teamMembers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMembers(teamId));
    dispatch(loadInvites(teamId));

    return () => {
      dispatch(clearAll());
    };
  }, [dispatch, teamId]);

  return { state };
};
