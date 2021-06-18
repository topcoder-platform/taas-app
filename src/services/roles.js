/**
 * Topcoder TaaS Service for Roles
 */
import { axiosInstance as m2mAxios } from "./requestM2MInterceptor";
import config from "../../config";

/**
 * Returns a list of roles.
 */
export function getRoles() {
  return m2mAxios.get(`${config.API.V5}/taas-roles`);
}

/**
 * Returns a single role by id.
 */
export function getRoleById(id) {
  return m2mAxios.get(`${config.API.V5}/taas-roles/${id}`);
}
