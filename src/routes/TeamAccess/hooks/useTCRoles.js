import { useEffect, useState } from "react";
import { decodeToken } from "tc-auth-lib";
import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app"

export const useTCRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getAuthUserTokens()
      .then(({tokenV3}) => {
        if (!!tokenV3) {
          const decoded = decodeToken(tokenV3);
          setRoles(decoded.roles);
        } else {
          throw new Error("unable to get token");
        }

      })
      .catch(err => {
        console.log("Unable to get user roles");        
      })
  },[])

  return roles;
}