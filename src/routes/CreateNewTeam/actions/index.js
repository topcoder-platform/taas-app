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

const addMatchingRole = (matchingRole) => ({
  type: ACTION_TYPE.ADD_MATCHING_ROLE,
  payload: matchingRole,
});

const deleteMatchingRole = () => ({
  type: ACTION_TYPE.DELETE_MATCHING_ROLE,
});

const editMatchingRole = (role) => ({
  type: ACTION_TYPE.EDIT_MATCHING_ROLE,
  payload: role,
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

export const editRoleAction = (role) => (dispatch, getState) => {
  dispatch(editMatchingRole(role));
  updateLocalStorage(getState().searchedRoles);
};

export const deleteSearchedRole = (id) => (dispatch, getState) => {
  dispatch(deleteRole(id));
  updateLocalStorage(getState().searchedRoles);
};

export const saveMatchingRole = (matchingRole) => (dispatch, getState) => {
  dispatch(addMatchingRole(matchingRole));
  updateLocalStorage(getState().searchedRoles);
};

export const clearMatchingRole = () => (dispatch, getState) => {
  dispatch(deleteMatchingRole());
  updateLocalStorage(getState().searchedRoles);
};

export const setIsLoading = (isLoading) => ({
  type: ACTION_TYPE.SET_IS_LOADING,
  payload: isLoading,
});
