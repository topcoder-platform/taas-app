const fs = require("fs");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("data.json");
const data = require("./data.json");
const middlewares = jsonServer.defaults();

const PORT = 8502;

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    // match URL
    "/taas-teams/:teamId/jobs/:jobId": "/jobs/:jobId?teamId=:teamId",
  })
);

// serve Resume PDF Example for download
server.get("/Resume-PDF-Example.pdf", (req, res) => {
  var file = fs.createReadStream("./Resume-PDF-Example.pdf");
  var stat = fs.statSync("./Resume-PDF-Example.pdf");
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Resume-PDF-Example.pdf"
  );
  file.pipe(res);
});

router.render = (req, res) => {
  const teamId = (req.path.match(/\/taas-teams\/(\d+)/) || [])[1];
  // populate team objects with `jobs`
  if (teamId) {
    res.jsonp(
      Object.assign(
        {
          jobs: data.jobs.filter((job) => job.teamId.toString() === teamId),
        },
        res.locals.data
      )
    );
  } else {
    res.jsonp(res.locals.data);
  }
};

server.use('/taasmock', router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`); // eslint-disable-line no-console
});
