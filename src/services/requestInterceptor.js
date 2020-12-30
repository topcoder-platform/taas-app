import axios from "axios";
import store from "../store";
import { getFreshToken, isTokenExpired } from "@topcoder-platform/tc-auth-lib";
import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";

export const getToken = () => {
  return new Promise(async (resolve, reject) => {
    const authUserTokens = await getAuthUserTokens();
    const token = authUserTokens ? authUserTokens.tokenV3 : null;
    if (token && !isTokenExpired(token)) {
      return resolve(token);
    } else {
      return getFreshToken()
        .then((token) => {
          resolve(token);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    }
  });
};

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to pass auth token
axiosInstance.interceptors.request.use((config) => {
  return getToken()
    .then((token) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    })
    .catch((err) => {
      // TODO handle this error somehow
      console.log(err);
      return config;
    });
});
