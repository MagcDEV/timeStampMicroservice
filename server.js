// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date", (req, res) => {
  const {date} = req.params;
  if(/\d{5,}/.test(date)) {
    res.json({
      "unix" : parseInt(date),
      "utc" : new Date(parseInt(date)).toUTCString()
    })
  } else {
    let dateObject = new Date(date);
    console.log(dateObject)
    if(dateObject == "Invalid Date"){
      res.json({
        error: "Invalid Date"
      })
    } else {
      res.json({
        "unix" : parseInt(new Date(date).valueOf()),
        "utc" :  new Date(date).toUTCString()
      })
    }
  }
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
