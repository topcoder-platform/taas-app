/**
 * Reducer for CreateNewTeam flow
 */
import { ACTION_TYPE } from "constants";

const initialState = {
  previousSearchId: undefined,
  addedRoles: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.CLEAR_SEARCHED_ROLES:
      return {
        ...state,
        addedRoles: [],
      };

    case ACTION_TYPE.ADD_SEARCHED_ROLE:
      return {
        previousSearchId: action.payload.searchId,
        addedRoles: [...state.addedRoles, action.payload],
      };

    case ACTION_TYPE.ADD_ROLE_SEARCH_ID:
      return {
        ...state,
        previousSearchId: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
