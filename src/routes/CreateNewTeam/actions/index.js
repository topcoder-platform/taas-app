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

const deleteRole = (id) => ({
  type: ACTION_TYPE.DELETE_SEARCHED_ROLE,
  payload: id,
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

export const deleteSearchedRole = (id) => (dispatch, getState) => {
  dispatch(deleteRole(id));
  updateLocalStorage(getState().searchedRoles);
};
