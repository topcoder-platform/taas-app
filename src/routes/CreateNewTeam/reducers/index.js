/**
 * Reducer for CreateNewTeam flow
 */
import { ACTION_TYPE } from "constants";

const loadState = () => {
  const defaultState = {
    previousSearchId: undefined,
    addedRoles: [],
    matchingRole: undefined,
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

const deleteRoleInState = (state, deleteId) => {
  const filteredRoles = state.addedRoles.filter(
    (role) => role.searchId !== deleteId
  );
  return {
    ...state,
    addedRoles: filteredRoles,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.CLEAR_SEARCHED_ROLES:
      return {
        ...state,
        addedRoles: [],
      };

    case ACTION_TYPE.ADD_MATCHING_ROLE:
      return {
        ...state,
        matchingRole: action.payload,
      };

    case ACTION_TYPE.DELETE_MATCHING_ROLE:
      return {
        ...state,
        matchingRole: null,
      };

    case ACTION_TYPE.EDIT_MATCHING_ROLE:
      const index = _.findIndex(state.addedRoles, {
        searchId: action.payload.searchId,
      });
      state.addedRoles[index] = _.extend(
        {},
        state.addedRoles[index],
        _.omit(action.payload, "searchId")
      );
      return {
        ...state,
        addedRoles: [...state.addedRoles],
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

    case ACTION_TYPE.DELETE_SEARCHED_ROLE:
      return deleteRoleInState(state, action.payload);

    default:
      return state;
  }
};

export default reducer;
