const https = require("https");
const express = require("express");
var cors = require('cors')

const app = express();
app.use(cors())

const storiesUrls = require("./storiesUrls.json");

app.get("/", (req, res) => {
  const url = req.query.url;
  if (url) {
    https
      .get(`${url}?format=json`, resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          res.send(JSON.parse(data.replace("])}while(1);</x>", "")));
        });
      })
      .on("error", err => {
        console.log(url);
        res.send("Error: " + err.message);
      });
  } else {
    res.json(storiesUrls);
  }
});

const port = 3030;

app.listen(port, () => console.log("App listening on port 3030!"));
