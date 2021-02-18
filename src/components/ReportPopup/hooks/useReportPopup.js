import { useDispatch } from "react-redux";
import { openReport } from "../actions";

export const useReportPopup = () => {
  const dispatch = useDispatch();

  return (teamName, teamId, memberHandle) => {
    dispatch(openReport(teamName, teamId, memberHandle));
  }
}