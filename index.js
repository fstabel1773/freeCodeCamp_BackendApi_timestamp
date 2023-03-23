// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

/****************************
 * project-challenge-solution
 *****************************/

const { isDate, isUnix } = require("./utils");

app.get("/api", (req, res) => {
  const currentUnix = new Date().getTime();
  const currentUTC = new Date().toUTCString();
  res.json({ unix: currentUnix, utc: currentUTC });
});

app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  if (isUnix(date)) {
    const unix = Number(date);
    const utc = new Date(unix).toUTCString();
    return res.status(200).json({ unix: unix, utc: utc });
  } else if (isDate(date) === true) {
    const unix = new Date(date).getTime();
    const utc = new Date(date).toUTCString();
    return res.status(200).json({ unix: unix, utc: utc });
  } else {
    return res.status(404).json({ success: false, error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 5000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
