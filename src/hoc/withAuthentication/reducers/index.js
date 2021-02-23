/**
 * Reducer for `authUser`
 */

import { ACTION_TYPE } from "constants";

const initialState = {
  isLoggedIn: null,
  userId: null,
  handle: null,
  roles: [],
  authError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.AUTH_USER_SUCCESS:
      return {
        ...initialState,
        ...action.payload,
        isLoggedIn: true,
      };

    case ACTION_TYPE.AUTH_USER_ERROR:
      return {
        ...initialState,
        authError: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
