/**
 * Reducer for Team Access page
 */
import { ACTION_TYPE } from "../actions";

const initialState = {
  members: undefined,
  invites: undefined,
  suggestions: [],
  loading: false,
  error: undefined,
  updating: false,
  inviteError: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.CLEAR_ALL:
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

    case ACTION_TYPE.REMOVE_INVITE_PENDING:
      return {
        ...state,
        updating: true,
        error: undefined,
      };

    case ACTION_TYPE.REMOVE_INVITE_SUCCESS:
      return {
        ...state,
        invites: state.invites.filter((invite) => invite.id !== action.payload),
        updating: false,
        error: undefined,
      };

    case ACTION_TYPE.REMOVE_INVITE_ERROR:
      return {
        ...state,
        updating: false,
        error: action.payload,
      };

    case ACTION_TYPE.LOAD_SUGGESTIONS_PENDING:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case ACTION_TYPE.LOAD_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        suggestions: action.payload,
        loading: false,
        error: undefined,
      };

    case ACTION_TYPE.LOAD_SUGGESTIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ACTION_TYPE.CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: [],
      };

    case ACTION_TYPE.ADD_INVITES_PENDING:
      return {
        ...state,
        updating: true,
        inviteError: undefined,
      };

    case ACTION_TYPE.ADD_INVITES_SUCCESS:
      return {
        ...state,
        invites: [...state.invites, ...action.payload.success],
        updating: false,
        inviteError: action.payload.failed
          ? {
              type: "SOME_FAILED",
              failed: action.payload.failed,
            }
          : undefined,
      };

    case ACTION_TYPE.ADD_INVITES_ERROR:
      return {
        ...state,
        updating: false,
        inviteError: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
