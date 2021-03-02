/**
 * Root Redux Reducer
 */
import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import positionDetailsReducer from "../routes/PositionDetails/reducers";
import teamMembersReducer from "../routes/TeamAccess/reducers";
import emailPopupReducer from "../components/EmailPopup/reducers";
import authUserReducer from "../hoc/withAuthentication/reducers";

const rootReducer = combineReducers({
  toastr: toastrReducer,
  positionDetails: positionDetailsReducer,
  teamMembers: teamMembersReducer,
  emailPopup: emailPopupReducer,
  authUser: authUserReducer,
});

export default rootReducer;
