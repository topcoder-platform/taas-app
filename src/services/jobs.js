/**
 * Topcoder TaaS Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

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
  return axios.post(`${config.API.V5}/jobs`, data);
};

/**
 * Update job.
 *
 * @param {{}} data job data
 * @param {number} jobId job id
 * @returns {Promise<{}>} job object
 */
export const updateJob = (data, jobId) => {
  return axios.put(`${config.API.V5}/jobs/${jobId}`, data);
};
