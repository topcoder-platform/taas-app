/**
 * Helper utilities
 *
 * This file should contain helper methods which cannot be grouped into a separate file like we did for "format.js".
 * If there are multiple methods which could be grouped into a separate file by their meaning they should be extracted from here to not make this file too big.
 */
import _ from "lodash";

/**
 * Delay code for some milliseconds using promise.
 *
 * @param {Number} duration duration in milliseconds
 *
 * @returns {Promise<void>} promise
 */
export const delay = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

/**
 * Decode URL Base64 string
 *
 * This method was taken from https://github.com/topcoder-platform/tc-auth-lib/blob/dev/src/token.js
 *
 * @param {string} str URL base 64 string
 *
 * @returns {string} JSON string
 */
function urlBase64Decode(str) {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");

  switch (output.length % 4) {
    case 0:
      break;

    case 2:
      output += "==";
      break;

    case 3:
      output += "=";
      break;

    default:
      throw new Error("Illegal base64url string!");
  }
  return decodeURIComponent(escape(atob(output))); //polyfill https://github.com/davidchambers/Base64.js
}

/**
 * Decode data of the bearer user token
 *
 * This method was taken from https://github.com/topcoder-platform/tc-auth-lib/blob/dev/src/token.js
 *
 * @param {string} token Bearer user token
 */
export function decodeToken(token) {
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("The token is invalid");
  }

  const decoded = urlBase64Decode(parts[1]);

  if (!decoded) {
    throw new Error("Cannot decode the token");
  }

  // covert base64 token in JSON object
  let t = JSON.parse(decoded);

  // tweaking for custom claim for RS256
  t.userId = _.parseInt(
    _.find(t, (value, key) => {
      return key.indexOf("userId") !== -1;
    })
  );

  t.handle = _.find(t, (value, key) => {
    return key.indexOf("handle") !== -1;
  });

  t.roles = _.find(t, (value, key) => {
    return key.indexOf("roles") !== -1;
  });

  return t;
}
