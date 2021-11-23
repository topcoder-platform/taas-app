/**
 * Custom Interview Thank You Page
 */
const url = require("url");
/**
 * Render custom HTML thank you page for scheduled or rescheduled interview.
 *
 * @param {import("express").Request} req express request
 * @param {import("express").Response} res express response
 */
function getInterviewThankYouPageController(req, res) {
  const query = req.query;
  const fullURL = url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });

  res.set("Content-Type", "text/html");
  res.send(
    `<h1>Thank you page (under construction)</h1>
      <pre>
      URL: ${fullURL}
      query: ${JSON.stringify(query, null, 2)}</pre>`
  );
}

module.exports = getInterviewThankYouPageController;
