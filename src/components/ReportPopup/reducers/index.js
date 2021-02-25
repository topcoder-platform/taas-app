/**
 * Reducer for Report popup
 */

import { ACTION_TYPE } from "constants";

const initialState = {
  teamName: undefined,
  teamId: undefined,
  memberHandle: undefined,
  isOpen: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.OPEN_REPORT:
      return {
        ...state,
        ...action.payload,
        isOpen: true,
      };

    case ACTION_TYPE.CLOSE_REPORT:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};

export default reducer;
