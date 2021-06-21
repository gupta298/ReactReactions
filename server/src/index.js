const express = require("express");
const cors = require("cors");
const comments = require("./comments");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json())

app.use("/comments", comments);
app.get("/", (request, response) => {
  return "Welcome to React Reactions";
});

app.listen(4000, () => console.log("The server is running at PORT 4000"));