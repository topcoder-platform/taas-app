/**
 * Topcoder TaaS Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

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
  return axios.put(
    `${config.API.V5}/resourceBookings/${resourceBookingId}`,
    data
  );
};
