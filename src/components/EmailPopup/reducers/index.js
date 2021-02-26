/**
 * Reducer for Email popup
 */

import { ACTION_TYPE } from "constants";

const initialState = {
  isOpen: false,
  popupOptions: {
    title: "",
    textPlaceholder: "",
    textDataField: "",
  },
  data: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.OPEN_EMAIL_POPUP:
      return {
        ...state,
        ...action.payload,
        isOpen: true,
      };

    case ACTION_TYPE.CLOSE_EMAIL_POPUP:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};

export default reducer;
