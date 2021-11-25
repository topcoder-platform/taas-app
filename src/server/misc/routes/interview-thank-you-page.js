/**
 * Custom Interview Thank You Page
 */
const url = require("url");
const axios = require("axios");
const _ = require("lodash");
const moment = require("moment");
const fs = require("fs");

// eslint-disable-next-line
const content = fs.readFileSync(__dirname + "/index.html");

/**
 * Render custom HTML thank you page for scheduled or rescheduled interview.
 *
 * @param {import("express").Request} req express request
 * @param {import("express").Response} res express response
 */
async function getInterviewThankYouPageController(req, res) {
  const query = req.query;
  const fullURL = url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });
  const { data: nylasHtml } = await axios.get(
    `https://schedule.nylas.com/${query.page_slug}`
  );
  // extract json object from html file
  const nylasconfig = JSON.parse(
    nylasHtml.match(/window.nylasWindowContext.page = (.*);<\/script>/)[1]
  );
  const object = {
    jobTitle: nylasconfig.name,
    page_slug: query.page_slug,
    tz: query.tz,
    week: moment.unix(query.start_time).format("dddd"),
    startDate: moment.unix(query.start_time).format("MMMM DD, yyyy"),
    startTime: moment.unix(query.start_time).format("H:mm A"),
    endTime: moment.unix(query.end_time).format("H:mm A"),
  };

  res.set("Content-Type", "text/html");
  res.send(_.template(content)(object));
}

module.exports = getInterviewThankYouPageController;
