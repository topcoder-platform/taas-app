/**
 * Topcoder TaaS Service for Roles
 */
import { axiosInstance as axios } from "./requestInterceptor";
import _ from "lodash";
import config from "../../config";

/**
 * Returns a list of roles.
 */
export function getRoles() {
  return axios.get(`${config.API.V5}/taas-roles`).then((response)=>{
    response.data =  _.filter(response.data, role => _.find(role.rates, r => r.global))
    return response
  });
}

/**
 * Returns a single role by id.
 */
export function getRoleById(id) {
  return axios.get(`${config.API.V5}/taas-roles/${id}`);
}
