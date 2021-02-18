import { useDispatch } from "react-redux";
import { openReport } from "../actions";

export const useReportPopup = () => {
  const dispatch = useDispatch();

  return (teamName, memberHandle) => {
    dispatch(openReport(teamName, memberHandle));
  }
}