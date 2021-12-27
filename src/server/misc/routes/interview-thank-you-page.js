/**
 * Custom Interview Thank You Page
 */
const url = require("url");
const axios = require("axios");
const _ = require("lodash");
const moment = require("moment-timezone");
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
  // get calendar name from timeslots
  const { data: timeslots } = await axios.get(
    `https://api.schedule.nylas.com/schedule/${query.page_slug}/timeslots?locale=en`
  );
  const startTime = moment.unix(query.start_time).tz(query.tz);
  const endTime = moment.unix(query.end_time).tz(query.tz);
  const object = {
    jobTitle: nylasconfig.name,
    calendarName: _.get(timeslots, "[0].host_name", ""),
    tz: query.tz,
    week: startTime.format("dddd"),
    startDate: startTime.format("MMMM DD, yyyy"),
    startTime: startTime.format("h:mm A"),
    endTime: endTime.format("h:mm A"),
  };

  res.set("Content-Type", "text/html");
  res.send(_.template(content)(object));
}

module.exports = getInterviewThankYouPageController;
