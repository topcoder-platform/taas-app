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

export function editSchedulingPage(pageId, page, editToken) {
  return axios.put(`${config.NYLAS_API_URL}/manage/pages/${pageId}`, page, {
    headers: {
      Authorization: `Bearer ${editToken}`,
    },
  });
}

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
  window.location.href = `https://api.nylas.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scopes=${scopes}&state=${state}`
}
