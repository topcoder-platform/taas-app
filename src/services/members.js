/**
 * Topcoder Member Service
 */
import axios from "axios";
import config from "../../config";

/**
 * Get details about the list of users by their ids.
 *
 * @param {number[]} userIds list of user ids
 *
 * @returns {Promise<object[]>} list of user details
 */
export const getMembersDetailsByIds = (userIds) => {
  const userIdsParams = userIds.map((userId) => `userId:${userId}`);
  const fields = "userId,handle,photoURL"; // requesting attributes which are available for everyone
  const query = userIdsParams.join(" OR ");
  const url =
    `${config.TC_MEMBER_SERVICE_URL}/_search/?fields=` +
    encodeURIComponent(fields) +
    `&query=${encodeURIComponent(query)}` +
    "&limit=" +
    userIds.length;

  return axios.get(url).then((resp) => {
    return resp.data.result.content;
  });
};
