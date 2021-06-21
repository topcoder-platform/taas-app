import { ACTION_TYPE } from "constants";

const updateLocalStorage = (state) => {
  try {
    localStorage.setItem("rolesState", JSON.stringify(state));
  } catch {
    console.error("Unable to set localStorage");
  }
};

const clearRoles = () => ({
  type: ACTION_TYPE.CLEAR_SEARCHED_ROLES,
});

const addRole = (searchedRole) => ({
  type: ACTION_TYPE.ADD_SEARCHED_ROLE,
  payload: searchedRole,
});

const addPreviousSearchId = (id) => ({
  type: ACTION_TYPE.ADD_ROLE_SEARCH_ID,
  payload: id,
});

export const replaceSearchedRoles = (roles) => ({
  type: ACTION_TYPE.REPLACE_SEARCHED_ROLES,
  payload: { roles, lastRoleId: roles[roles.length - 1].searchId },
});

export const clearSearchedRoles = () => (dispatch, getState) => {
  dispatch(clearRoles());
  updateLocalStorage(getState().searchedRoles);
};

export const addSearchedRole = (searchedRole) => (dispatch, getState) => {
  dispatch(addRole(searchedRole));
  updateLocalStorage(getState().searchedRoles);
};

export const addRoleSearchId = (id) => (dispatch, getState) => {
  dispatch(addPreviousSearchId(id));
  updateLocalStorage(getState().searchedRoles);
};
