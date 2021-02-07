import axios from "axios";
import store from "../store";
import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to pass auth token
axiosInstance.interceptors.request.use((config) => {
  return getAuthUserTokens()
    .then(({ tokenV3: token }) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    })
    .catch((err) => {
      return config;
    });
});

// response interceptor to handle error
axiosInstance.interceptors.response.use(
  (config) => {
    // return the response
    return config;
  },
  (error) => {
    // return the response body
    return Promise.reject(error.response.data);
  }
);
