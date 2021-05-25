/**
 * Reducer for `authUser`
 */
import _ from "lodash";
import { ACTION_TYPE } from "constants";

const initialState = {
  isLoggedIn: undefined,
  userId: undefined,
  handle: undefined,
  roles: [],
  authError: undefined,
  // for permissions check purpose we need to know team `members'
  teamId: undefined,
  teamMembers: undefined,
  teamMembersLoading: undefined,
  teamMembersLoadingError: undefined,
  teamMembersLoaded: false,
  v5UserProfile: undefined,
  v5UserProfileLoading: false,
  v5UserProfileLoadingError: false,
};

const authInitialState = _.pick(initialState, [
  "isLoggedIn",
  "userId",
  "handle",
  "roles",
  "authError",
]);

const teamMembersInitialState = _.pick(initialState, [
  "teamId",
  "teamMembers",
  "teamMembersLoading",
  "teamMembersLoadingError",
]);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.AUTH_USER_SUCCESS:
      return {
        ...state,
        ...authInitialState,
        ...action.payload,
        isLoggedIn: true,
      };

    case ACTION_TYPE.AUTH_USER_ERROR:
      return {
        ...state,
        ...authInitialState,
        authError: action.payload,
      };

    case ACTION_TYPE.AUTH_LOAD_TEAM_MEMBERS_PENDING:
      return {
        ...state,
        teamId: action.meta.teamId,
        teamMembers: initialState.teamMembersLoadingError,
        teamMembersLoading: true,
        teamMembersLoadingError: initialState.teamMembersLoadingError,
        teamMembersLoaded: false,
      };

    case ACTION_TYPE.AUTH_LOAD_TEAM_MEMBERS_SUCCESS: {
      // only set loaded team members if we haven't changed the team yet
      if (state.teamId === action.meta.teamId) {
        return {
          ...state,
          teamMembersLoading: false,
          teamMembers: action.payload,
          teamMembersLoaded: true,
        };
      }

      return state;
    }

    case ACTION_TYPE.AUTH_LOAD_TEAM_MEMBERS_ERROR: {
      // only set error for loading team members if we haven't changed the team yet
      if (state.teamId === action.meta.teamId) {
        return {
          ...state,
          teamMembersLoading: false,
          teamMembersLoadingError: action.payload,
          teamMembersLoaded: false,
        };
      }

      return state;
    }

    case ACTION_TYPE.AUTH_CLEAR_TEAM_MEMBERS: {
      return {
        ...state,
        ...teamMembersInitialState,
      };
    }

    case ACTION_TYPE.AUTH_LOAD_V5_USER_PROFILE_PENDING: {
      return {
        ...state,
        v5UserProfileLoading: true,
      };
    }
    case ACTION_TYPE.AUTH_LOAD_V5_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        v5UserProfile: action.payload,
        v5UserProfileLoading: false,
        v5UserProfileLoadingError: false,
      };
    }
    case ACTION_TYPE.AUTH_LOAD_V5_USER_PROFILE_ERROR: {
      return {
        ...state,
        v5UserProfileLoadingError: action.payload,
        v5UserProfileLoading: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
