/**
 * Authentication 
 *
 * wrap component for authentication 
 */
import React, { useCallback, useState, useEffect } from "react";
import { getAuthUserTokens, login } from "@topcoder/micro-frontends-navbar-app";

export default function Authentication(Component) {

  const  AuthenticatedComponent = (props) => {
    let [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
      if (props.auth) {
        getAuthUserTokens()
          .then(({ tokenV3 }) => {
            if (!!tokenV3) {
              setIsLoggedIn(!!tokenV3)
            } else {
              login()
            }
          })
      }
    }, [props.auth]);

    return (
      <div>
        {
          (!props.auth || props.auth && isLoggedIn === true)
            ? <Component { ...props}/>
            : null
        }
      </div>
    )
  }

  return AuthenticatedComponent
}
