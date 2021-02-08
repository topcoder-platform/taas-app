/**
 * Topcoder TaaS Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";
import { ES_REINDEX_DELAY } from "../constants";
import { delay } from "utils/helpers";

/**
 * Get job by id.
 * @param {number} jobId job id
 * @returns {Promise<object>} job object
 */
export const getJobById = (jobId) => {
  return axios.get(`${config.API.V5}/jobs/${jobId}`);
};

/**
 * Get empty job.
 * @param {number} teamId team id
 * @returns {Promise<object>} job object
 */
export const getEmptyJob = (teamId) => {
  return Promise.resolve({
    data: {
      projectId: teamId,
      title: "",
      description: "",
      numPositions: 1,
      workload: "full-time",
      rateType: "weekly",
      skills: [],
      status: "sourcing",
    },
  });
};

/**
 * Create job.
 *
 * @param {{}} data job data
 * @returns {Promise<{}>} job object
 */
export const createJob = (data) => {
  return (
    axios
      .post(`${config.API.V5}/jobs`, data)
      // temporary fix:
      // after creating a job we are reloading the list of jobs
      // so we have to wait a bit to make sure job is indexed in the ES
      .then((response) => delay(ES_REINDEX_DELAY).then(() => response))
  );
};

/**
 * Update job.
 *
 * @param {{}} data job data
 * @param {number} jobId job id
 * @returns {Promise<{}>} job object
 */
export const updateJob = (data, jobId) => {
  return (
    axios
      .put(`${config.API.V5}/jobs/${jobId}`, data)
      // temporary fix:
      // after updating a job we are reloading the list of jobs
      // so we have to wait a bit to make sure job is indexed in the ES
      .then((response) => delay(ES_REINDEX_DELAY).then(() => response))
  );
};
