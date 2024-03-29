/* global process */

import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";
import jwt from "jsonwebtoken";
import { NYLAS_CONNECT_CALENDAR_JWT_SECRET } from "constants/";
const nylasClientId = process.env.NYLAS_CLIENT_ID;

export const getUserSettings = (userId) => {
  return axios.get(
    `${config.API.V5}/taas-teams/user-meeting-settings/${userId}`
  );
};

export const deleteCalendar = (userId, calendarId) => {
  return axios.delete(
    `${config.API.V5}/taas-teams/user-meeting-settings/${userId}/calendars/${calendarId}`
  );
};

/**
 * Connect calendar
 *
 * @param {UUID of current user} userId
 * @param {Url to get redirected to when api finishes saving calendar in UserMeetingSettings record} appRedirectUrl
 *
 * @returns Redirects to Nylas server so user can authenticate & connect account in Nylas
 */
export const connectCalendar = (userId, appRedirectUrl) => {
  const apiRedirectUrl = encodeURIComponent(
    `${config.API.V5}/taas-teams/user-meeting-settings/callback`
  );

  const state = jwt.sign(
    {
      userId,
      redirectTo: appRedirectUrl,
    },
    // we use secret just because it's required, we don't have actual reasons to secure data inside
    // we use JWT token just to compress data we pass to the `state` because `state` has very limited length allowed
    NYLAS_CONNECT_CALENDAR_JWT_SECRET
  );

  const nylasCalendarConnectionUrl = `https://api.nylas.com/oauth/authorize?client_id=${nylasClientId}&redirect_uri=${apiRedirectUrl}&response_type=code&scopes=calendar&state=${state}`;

  return (window.location.href = nylasCalendarConnectionUrl);
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

/**
 * Cancel interview
 * @param {String} nylasPageSlug  the nylasPageSlug
 * @param {String} nylasEventEditHash The nylasEventEditHash
 * @param {String} reason The cancel reason
 * @returns Promise
 */
export const cancelInterview = (nylasPageSlug, nylasEventEditHash, reason) => {
  return axios.post(
    `https://api.schedule.nylas.com/schedule/${nylasPageSlug}/${nylasEventEditHash}/cancel`,
    {
      reason,
    }
  );
};
