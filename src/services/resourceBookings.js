/**
 * Topcoder TaaS Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";
import { delay } from "utils/helpers";
import { ES_REINDEX_DELAY } from "constants";

/**
 * Get resource booking by id.
 * @param {number} resourceBookingId resource booking id
 * @returns {Promise<object>} resource booking object
 */
export const getReourceBookingById = (resourceBookingId) => {
  return axios.get(`${config.API.V5}/resourceBookings/${resourceBookingId}`);
};

/**
 * Update resource booking.
 *
 * @param {{}} data resource booking data
 * @param {number} resourceBookingId resource booking id
 * @returns {Promise<{}>} resource booking object
 */
export const updateReourceBooking = (data, resourceBookingId) => {
  return (
    axios
      .put(`${config.API.V5}/resourceBookings/${resourceBookingId}`, data) // temporary fix:
      // after updating a resource booking we are reloading the list of resource bookings
      // so we have to wait a bit to make sure job is indexed in the ES
      .then((response) => delay(ES_REINDEX_DELAY).then(() => response))
  );
};
