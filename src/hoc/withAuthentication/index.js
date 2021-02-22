/**
 * Authentication
 *
 * wrap component for authentication
 */
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { getAuthUserTokens, login } from "@topcoder/micro-frontends-navbar-app";
import LoadingIndicator from "../../components/LoadingIndicator";
import { authUserSuccess, authUserError } from "./actions";
import { decodeToken } from "utils/helpers";
import { useDispatch, useSelector } from "react-redux";

export default function withAuthentication(Component) {
  const AuthenticatedComponent = (props) => {
    const dispatch = useDispatch();
    const { isLoggedIn, authError } = useSelector((state) => state.authUser);

    useEffect(() => {
      // prevent page redirecting to login page when unmount
      let isUnmount = false;
      getAuthUserTokens()
        .then(({ tokenV3 }) => {
          if (!!tokenV3) {
            const tokenData = decodeToken(tokenV3);
            dispatch(
              authUserSuccess(_.pick(tokenData, ["userId", "handle", "roles"]))
            );
          } else if (!isUnmount) {
            login();
          }
        })
        .catch((error) => dispatch(authUserError(error)));

      return () => {
        isUnmount = true;
      };
    }, [dispatch]);

    return (
      <>
        {/* Show loading indicator until we know if user is logged-in or no.
            In we got error during this process, show error */}
        {isLoggedIn === null && <LoadingIndicator error={authError} />}

        {/* Show component only if user is logged-in */}
        {isLoggedIn === true ? <Component {...props} /> : null}
      </>
    );
  };

  return AuthenticatedComponent;
}
