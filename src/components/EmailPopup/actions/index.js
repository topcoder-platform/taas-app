/**
 * Report popup actions
 */
import { ACTION_TYPE } from "constants";

/**
 * Action to create an email popup and open it
 * @param {Object} popupOptions Options to customize popup appearance and behaviour
 * @param {Object} data Data to send to server with email text
 */
export const openEmailPopup = (popupOptions, data) => ({
  type: ACTION_TYPE.OPEN_EMAIL_POPUP,
  payload: { popupOptions, data },
});

/**
 * Action to close an email popup
 */
export const closeEmailPopup = () => ({
  type: ACTION_TYPE.CLOSE_EMAIL_POPUP,
});
