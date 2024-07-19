import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// initialize important variables
const app = express();
const port = 3000;
const apiURL = "https://api.brawlstars.com/v1/";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjI5ZDk3ZjU3LTU2ZjUtNDQzYi04YjhmLWJjNjg2MjM0OGJjZiIsImlhdCI6MTcyMTQxODYxOSwic3ViIjoiZGV2ZWxvcGVyL2Q5NmE2Zjk2LTFkYjAtMTM1YS03Zjc1LWI4ZTY2NmU3MmEzNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTI4Ljg0LjEyNy4xNSIsIjEyOC44NC4xMjUuMTQiXSwidHlwZSI6ImNsaWVudCJ9XX0.ZFjZU8KBxRcKAkIqtkyp44I3LqrryM2jPkDnCgiRiWnFz0mAwQ3s7N84rLMn4bZY4kUtQiK6onCvZC-X_oYeKg";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// helper functions
function generateError(error) {
  return `Error ${error.response.status}: ${error.response.data.reason}`;
}

async function getEvent() {
  try {
    const response = await axios.get(`${apiURL}events/rotation`, config);
    return [response.data[0], response.data[1], response.data[5]];
  } catch (error) {
    return [generateError(error), generateError(error), generateError(error)];
  }
}

// middleware/route-handling configs
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const events = await getEvent();
  res.render("index.ejs", { events });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", async (req, res) => {
  // get events
  const events = await getEvent();
  try {
    // allow tags formatted in lower-case with # in front
    let tag = req.body.tag.toUpperCase();
    if (tag[0] === "#") {
      tag = tag.slice(1, tag.length);
    }
    // get player
    const response = await axios.get(`${apiURL}players/%23${tag}`, config);
    const player = response.data;
    // render page
    res.render("index.ejs", { player, events });
  } catch (error) {
    // if error was a notFound error player entered an invalid tag
    if (error.response.data.reason === "notFound") {
      res.render("index.ejs", {
        invalid: "No player with this tag! Please re-enter a valid tag.",
        events,
      });
    } else {
      res.render("index.ejs", {
        invalid: generateError(error),
        events,
      });
    }
  }
});

// start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
