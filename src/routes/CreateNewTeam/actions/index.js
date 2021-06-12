import { ACTION_TYPE } from "constants";

export const clearSearchedRoles = () => ({
  type: ACTION_TYPE.CLEAR_SEARCHED_ROLES,
});

export const addSearchedRole = (searchedRole) => ({
  type: ACTION_TYPE.ADD_SEARCHED_ROLE,
  payload: searchedRole,
});

export const addRoleSearchId = (id) => ({
  type: ACTION_TYPE.ADD_ROLE_SEARCH_ID,
  payload: id,
})