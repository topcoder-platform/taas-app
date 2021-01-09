/**
 * Authentication
 *
 * wrap component for authentication
 */
import React, { useCallback, useState, useEffect } from "react";
import { getAuthUserTokens, login } from "@topcoder/micro-frontends-navbar-app";
import LoadingIndicator from "../components/LoadingIndicator";

export default function withAuthentication(Component) {
  const AuthenticatedComponent = (props) => {
    let [isLoggedIn, setIsLoggedIn] = useState(null);
    let [authError, setAuthError] = useState(false);

    useEffect(() => {
      if (props.auth) {
        getAuthUserTokens()
          .then(({ tokenV3 }) => {
            if (!!tokenV3) {
              setIsLoggedIn(!!tokenV3);
            } else {
              login();
            }
          })
          .catch((err) => {
            setAuthError(err);
          });
      }
    }, [props.auth]);

    return (
      <>
        {authError && <LoadingIndicator error={authError.toString()} />}
        {!props.auth || (props.auth && isLoggedIn === true) ? (
          <Component {...props} />
        ) : null}
      </>
    );
  };

  return AuthenticatedComponent;
}
