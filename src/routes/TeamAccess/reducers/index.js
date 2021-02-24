/**
 * Reducer for Team Access page
 */
import { ACTION_TYPE } from "constants";

const initialState = {
  members: undefined,
  invites: undefined,
  loading: false,
  error: undefined,
  updating: false,
  addError: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.RESET_MEMBERS_STATE:
      return initialState;

    case ACTION_TYPE.LOAD_MEMBERS_PENDING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case ACTION_TYPE.LOAD_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload,
        loading: false,
        error: undefined,
      };

    case ACTION_TYPE.LOAD_MEMBERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ACTION_TYPE.LOAD_INVITES_PENDING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case ACTION_TYPE.LOAD_INVITES_SUCCESS:
      return {
        ...state,
        invites: action.payload,
        loading: false,
        error: undefined,
      };

    case ACTION_TYPE.LOAD_INVITES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ACTION_TYPE.REMOVE_MEMBER_PENDING:
      return {
        ...state,
        updating: true,
        error: undefined,
      };

    case ACTION_TYPE.REMOVE_MEMBER_SUCCESS:
      return {
        ...state,
        members: state.members.filter((member) => member.id !== action.payload),
        updating: false,
        error: undefined,
      };

    case ACTION_TYPE.REMOVE_MEMBER_ERROR:
      return {
        ...state,
        updating: false,
        error: action.payload,
      };

    case ACTION_TYPE.ADD_MEMBERS_PENDING:
      return {
        ...state,
        updating: true,
        addError: undefined,
      };

    case ACTION_TYPE.ADD_MEMBERS_SUCCESS:
      return {
        ...state,
        members: [...state.members, ...action.payload.success],
        updating: false,
        addError: action.payload.failed
          ? {
              type: "SOME_FAILED",
              failed: action.payload.failed,
            }
          : undefined,
      };

    case ACTION_TYPE.ADD_MEMBERS_ERROR:
      return {
        ...state,
        updating: false,
        addError: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
