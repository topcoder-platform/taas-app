/**
 * Scheduler Service
 */
import { axiosInstance as axiosWrapper } from "./requestInterceptor";
import axios from "axios";
import config from "../../config";

/**
 * Initializes the Scheduler
 * @param {Object} profile the logged in user and candidate profile
 */
export function initializeScheduler(profile) {
  return axiosWrapper.post(
    `${config.INTERVIEW_SCHEDULER_URL}/authorize`,
    profile
  );
}

/**
 * Gets the scheduling page url
 * @param {Object} page The scheduling page
 * @param {Object} profile The customer and candidate details
 * @returns Promise
 */
export function scheduleInterview(page, profile) {
  return axiosWrapper.post(`${config.INTERVIEW_SCHEDULER_URL}/interview`, {
    schedulingPage: page,
    ...profile,
  });
}

/**
 * Returns the scheduling page url for the given interview and round
 * @param {String} interviewId The interview id
 * @param {String} roundId The round id
 * @returns Promise
 */
export function getSchedulingPage(interviewId, roundId) {
  return axiosWrapper.get(`${config.INTERVIEW_SCHEDULER_URL}/interview`, {
    params: {
      interviewId,
      roundId,
    },
  });
}

/**
 * Updates a scheduling page
 * @param {Number} pageId The scheduling page id
 * @param {Object} page The scheduling page
 * @param {String} editToken The auth token
 * @returns Promise
 */
export function editSchedulingPage(pageId, page, editToken) {
  return axios.put(`${config.NYLAS_API_URL}/manage/pages/${pageId}`, page, {
    headers: {
      Authorization: `Bearer ${editToken}`,
    },
  });
}

/**
 * Redirects to Nylas Hosted Auth
 */
export function redirectToNylasHostedAuth() {
  const clientId = process.env.NYLAS_CLIENT_ID;
  const redirectUri = "http://localhost:3001/oauth/callback";
  const responseType = "code";
  const scopes = "calendar";
  const state = "";
  // const state = jwt.sign({
  //   schedulingPageId: schedulingPage.id,
  //   candidateHandle: props.inputData.candidate.handle,
  //   pageEditToken: schedulingPage.edit_token
  // }, 'secret')
  window.location.href = `https://api.nylas.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scopes=${scopes}&state=${state}`;
}

/**
 * Fetch the scheduling page details
 * @param {Number} pageId The scheduling page id
 * @param {String} editToken The auth token
 * @returns Promise
 */
export function fetchLatestSchedule(pageId, editToken) {
  return axios.get(`${config.NYLAS_API_URL}/manage/pages/${pageId}`, {
    headers: {
      Authorization: `Bearer ${editToken}`,
    },
  });
}
