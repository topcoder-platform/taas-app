/**
 * Topcoder TaaS Service for Roles
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

/**
 * Returns a list of roles.
 */
export function getRoles() {
  return axios.get(`${config.API.V5}/taas-roles`);
}

/**
 * Returns a single role by id.
 */
export function getRoleById(id) {
  return axios.get(`${config.API.V5}/taas-roles/${id}`);
}
