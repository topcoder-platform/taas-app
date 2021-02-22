/**
 * Auth User actions
 */

export const ACTION_TYPE = {
  AUTH_USER_SUCCESS: "AUTH_USER_SUCCESS",
  AUTH_USER_ERROR: "AUTH_USER_ERROR",
};

/**
 * Action to set auth user data
 *
 * @param {object} tokenData user data from token
 */
export const authUserSuccess = (tokenData) => ({
  type: ACTION_TYPE.AUTH_USER_SUCCESS,
  payload: tokenData,
});

/**
 * Action to set auth user error
 */
export const authUserError = (error) => ({
  type: ACTION_TYPE.AUTH_USER_ERROR,
  payload: error,
});
