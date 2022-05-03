/**
 * Authentication
 *
 * wrap component for authentication
 *
 * - checks if user is logged-in, and if not, then redirects to the login page
 *
 * Also, this component load important data for `hasPermission` method:
 * - decodes user token and set in Redux Store `authUser.userId, handle, roles`
 *   - we need to know user `roles` to check if user user has Topcoder Roles
 * - load team (project) members if current route has `:teamId` param
 *   - we need to know members of the team to check user users Project Roles
 */
import React, { useEffect } from "react";
import _ from "lodash";
import {
  getAuthUserTokens,
  login,
  businessLogin,
} from "@topcoder/mfe-header";
import LoadingIndicator from "../../components/LoadingIndicator";
import {
  authUserSuccess,
  authUserError,
  authLoadTeamMembers,
  authLoadV5UserProfile,
  authClearTeamMembers,
} from "./actions";
import { setIsLoading } from "../../routes/CreateNewTeam/actions";
import { decodeToken } from "tc-auth-lib";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "@reach/router";

export default function withAuthentication(Component, businessAuth = false) {
  const AuthenticatedComponent = (props) => {
    const dispatch = useDispatch();
    const {
      isLoggedIn,
      authError,
      teamId,
      teamMembersLoaded,
      teamMembersLoadingError,
      v5UserProfile,
      v5UserProfileLoading,
      v5UserProfileLoadingError,
    } = useSelector((state) => state.authUser);
    const params = useParams();

    /*
      Check if user is logged-in or redirect ot the login page
    */
    useEffect(() => {
      // prevent page redirecting to login page when unmount
      let isUnmount = false;

      if (!isLoggedIn) {
        dispatch(setIsLoading(true));
        getAuthUserTokens()
          .then(({ tokenV3 }) => {
            if (!!tokenV3) {
              const tokenData = decodeToken(tokenV3);
              dispatch(
                authUserSuccess(
                  _.pick(tokenData, ["userId", "handle", "roles"])
                )
              );
            } else if (!isUnmount) {
              businessAuth ? businessLogin() : login();
            }
          })
          .catch((error) => dispatch(authUserError(error)));
      }

      return () => {
        isUnmount = true;
      };
    }, [dispatch, isLoggedIn]);

    /*
      Load team (project) members if current URL has `:teamId` param
    */
    useEffect(() => {
      // if we haven't loaded team members yet, or we if we've moved to a page for another team
      // we have to load team members which we would use for checking permissions
      if (
        isLoggedIn &&
        params.teamId &&
        (!teamId || params.teamId !== teamId)
      ) {
        dispatch(setIsLoading(true));
        dispatch(authLoadTeamMembers(params.teamId));

        // if we are going to some page without `teamId` then we have to clear team members
        // if we had some
      } else if (teamId && !params.teamId) {
        dispatch(authClearTeamMembers());
      }
    }, [params.teamId, teamId, dispatch, isLoggedIn]);

    /*
      Load V5 User Profile
    */
    useEffect(() => {
      // is user is logged-in, but V5 user profile is not loaded yet, then load it
      if (isLoggedIn && !v5UserProfileLoading && !v5UserProfile) {
        dispatch(setIsLoading(true));
        dispatch(authLoadV5UserProfile());
      }
    }, [dispatch, isLoggedIn, v5UserProfileLoading, v5UserProfile]);

    return (
      <>
        {/* Show loading indicator until we know if user is logged-in or no.
            Also, show loading indicator if we need to know team members but haven't loaded them yet.
            or load v5 user profile but haven't loaded them yet.
            In we got error during this process, show error */}
        {(isLoggedIn === null ||
          (params.teamId && !teamMembersLoaded) ||
          v5UserProfileLoading ||
          v5UserProfileLoadingError) && (
          <LoadingIndicator
            error={
              authError || teamMembersLoadingError || v5UserProfileLoadingError
            }
          />
        )}

        {/* Show component only if user is logged-in and if we don't need team members or we already loaded them */}
        {isLoggedIn === true &&
        v5UserProfile &&
        (!params.teamId || teamMembersLoaded) ? (
          <Component {...props} />
        ) : null}
      </>
    );
  };

  return AuthenticatedComponent;
}

export function withBusinessAuthentication(Component) {
  return withAuthentication(Component, true);
}
