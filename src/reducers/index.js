/**
 * Root Redux Reducer
 */
import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import positionDetailsReducer from "../routes/PositionDetails/reducers";

const rootReducer = combineReducers({
  toastr: toastrReducer,
  positionDetails: positionDetailsReducer,
});

export default rootReducer;
