import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// initialize important variables
const app = express();
const port = 3000;
const apiURL = "https://api.brawlstars.com/v1/";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjRkYzVmMzJhLTNmNDMtNDlmNC1hNDk5LTFjMzBjY2UzN2RmMSIsImlhdCI6MTcyMTI3MDcxOSwic3ViIjoiZGV2ZWxvcGVyL2Q5NmE2Zjk2LTFkYjAtMTM1YS03Zjc1LWI4ZTY2NmU3MmEzNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTc0LjE5Ny4xOTkuMTM0IiwiMTc0LjE5Ny4yMDYuMjE5IiwiMTI4Ljg0LjEyNS4xNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.Qi6DdOvxXIVydIv7q8un-Ieeioswc9a1hIGfW0LQVS66XoO7-zcM3NTP-e4BoGoN5EyVseKqi3eCmlKoCRYR-w";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// middleware/route-handling configs
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", async (req, res) => {
  try {
    let tag = req.body.tag.toUpperCase();
    if (tag[0] === "#") {
      tag = tag.slice(1, tag.length);
    }
    const response = await axios.get(apiURL + "players/%23" + tag, config);
    const player = response.data;
    res.render("index.ejs", { player });
  } catch (error) {
    if (error.response.data.reason === "notFound") {
      res.render("index.ejs", {
        invalid: "No player with this tag! Please re-enter a valid tag.",
      });
    }
    console.error(error.response.data);
  }
});
// start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
