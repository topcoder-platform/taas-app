/*
 * axios interceptor with machine token
 */
import axios from "axios";
import _ from "lodash";
import { getM2MToken } from "../utils/helpers";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to pass machine auth token
axiosInstance.interceptors.request.use((config) => {
  return getM2MToken()
    .then((token) => {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    })
    .catch(() => config);
});

// response interceptor to handle error
axiosInstance.interceptors.response.use(
  (config) => {
    // return the response
    return config;
  },
  (error) => {
    const serverErrorMessage = _.get(error, "response.data.message");

    // if there is server error message, then return it inside `message` property of error
    if (serverErrorMessage) {
      error.message = serverErrorMessage;
    }

    return Promise.reject(error);
  }
);
