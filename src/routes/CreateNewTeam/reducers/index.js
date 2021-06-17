/**
 * Reducer for CreateNewTeam flow
 */
import { ACTION_TYPE } from "constants";

const loadState = () => {
  const defaultState = {
    previousSearchId: undefined,
    addedRoles: [],
  };
  try {
    const state = localStorage.getItem("rolesState");
    if (state === null) {
      return defaultState;
    }
    return JSON.parse(state);
  } catch {
    return defaultState;
  }
};

const initialState = loadState();

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.CLEAR_SEARCHED_ROLES:
      return {
        ...state,
        addedRoles: [],
      };

    case ACTION_TYPE.ADD_SEARCHED_ROLE:
      return {
        ...state,
        previousSearchId: action.payload.searchId,
        addedRoles: [...state.addedRoles, action.payload],
      };

    case ACTION_TYPE.ADD_ROLE_SEARCH_ID:
      return {
        ...state,
        previousSearchId: action.payload,
      };

    case ACTION_TYPE.REPLACE_SEARCHED_ROLES:
      return {
        ...state,
        addedRoles: action.payload.roles,
        previousSearchId: action.payload.lastRoleId,
      };

    default:
      return state;
  }
};

export default reducer;
