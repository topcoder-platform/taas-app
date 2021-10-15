import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

export const getUserSettings = (userId) => {
  return axios.get(
    `${config.INTERVIEW_API_URL}taas/user-meeting-settings/${userId}`
  );
};

export const deleteCalendar = (userId, calendarId) => {
  return axios.delete(
    `${config.INTERVIEW_API_URL}taas/user-meeting-settings/${userId}/calendars/${calendarId}`
  );
};

export const confirmInterview = (candidateJobId, data) => {
  return axios.patch(
    `${config.INTERVIEW_API_URL}jobCandidates/${candidateJobId}/requestInterview`,
    data
  );
};
