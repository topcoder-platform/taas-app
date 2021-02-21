/**
 * Use report popup hook
 */

import { useDispatch } from "react-redux";
import { openReport } from "../actions";

/**
 * Hook to allow report popup to be opened by any other component
 * (as long as it is mounted somewhere in the tree)
 *
 * @returns func A wrapper around the open report dispatch
 */
export const useReportPopup = () => {
  const dispatch = useDispatch();

  return (teamName, teamId, memberHandle) => {
    dispatch(openReport(teamName, teamId, memberHandle));
  };
};
