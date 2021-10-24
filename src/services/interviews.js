import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

export const getUserSettings = (userId) => {
  return axios.get(`${config.API.V5}/taas/user-meeting-settings/${userId}`);
};

export const deleteCalendar = (userId, calendarId) => {
  return axios.delete(
    `${config.API.V5}/taas/user-meeting-settings/${userId}/calendars/${calendarId}`
  );
};

export const confirmInterview = (candidateJobId, data) => {
  return axios.patch(
    `${config.API.V5}/jobCandidates/${candidateJobId}/requestInterview`,
    data
  );
};

/**
 * Returns the interview page url for the given interview
 * @param {String} interviewId The interview id
 * @returns Promise
 */
export const getInterview = (interviewId) => {
  return axios.get(`${config.API.V5}/getInterview/${interviewId}`);
};
