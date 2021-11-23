/* global process */

const express = require("express");

const app = express();
const miscRouter = require("./src/server/misc/router");

// Register misc routes
app.use("/taas-app/misc", miscRouter);

app.use(
  "/taas-app",
  express.static("./dist", {
    setHeaders: function setHeaders(res) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    },
  })
);

app.get("/", function (req, res) {
  res.send("alive");
});

const PORT = process.env.PORT || 8501;
app.listen(PORT);
console.log(`App is hosted on port ${PORT}.`); // eslint-disable-line no-console
