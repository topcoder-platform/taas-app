/**
 * Misc router
 *
 * Add any `/misc` routes here.
 */
const express = require("express");
const router = express.Router();

const getInterviewThankYouPageController = require("./routes/interview-thank-you-page");

router.get("/interview-thank-you-page", getInterviewThankYouPageController);

module.exports = router;
