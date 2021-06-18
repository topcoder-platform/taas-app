"use strict";
var _ = require("lodash"),
  axios = require("axios"),
  jwt = require("jsonwebtoken");

const getTokenExpiryTime = function (token) {
  let expiryTime = 0;
  if (token) {
    let decodedToken = jwt.decode(token);
    let expiryTimeInMilliSeconds =
      (decodedToken.exp - 60) * 1000 - new Date().getTime();
    expiryTime = Math.floor(expiryTimeInMilliSeconds / 1000);
  }
  return expiryTime;
};

module.exports = function (config) {
  let auth0Url = _.get(config, "AUTH0_URL", "");
  let auth0Audience = _.get(config, "AUTH0_AUDIENCE", "");
  let auth0ProxyServerUrl = _.get(config, "AUTH0_PROXY_SERVER_URL", auth0Url);

  var cachedToken = {};

  return {
    /**
     * Generate machine to machine token from Auth0
     * V3 API specification
     * @param  clientId  client Id provided from Auth0
     * @param  clientSecret  client secret provided from Auth0
     * @return  Promise  promise to pass responses
     */
    getMachineToken: (clientId, clientSecret) => {
      var options = {
        method: "post",
        url: auth0ProxyServerUrl,
        headers: { "content-type": "application/json" },
        data: {
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
          audience: auth0Audience,
          auth0_url: auth0Url,
        },
        json: true,
      };

      return new Promise(function (resolve, reject) {
        // We cached the token to cachedToken variable,
        // So we check the variable and the time here.
        let appCachedToken = cachedToken[clientId];
        let appCachedTokenExpired = false;

        //Check the token expiry
        if (appCachedToken) {
          if (getTokenExpiryTime(appCachedToken) <= 0) {
            appCachedTokenExpired = true;
          }
        }
        if (!appCachedToken || appCachedTokenExpired) {
          axios(options)
            .then(({ data }) => {
              if (data.access_token) {
                cachedToken[clientId] = data.access_token;
                resolve(cachedToken[clientId]);
              } else {
                reject(new Error("Unknown Error"));
              }
            })
            .catch((error) => {
              return reject(new Error(error));
            });
        } else {
          resolve(appCachedToken);
        }
      });
    },
  };
};
