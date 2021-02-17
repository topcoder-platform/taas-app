/**
 * Root Redux Reducer
 */
import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import positionDetailsReducer from "../routes/PositionDetails/reducers";
import teamMembersReducer from "../routes/TeamAccess/reducers";

const rootReducer = combineReducers({
  toastr: toastrReducer,
  positionDetails: positionDetailsReducer,
  teamMembers: teamMembersReducer,
});

export default rootReducer;
