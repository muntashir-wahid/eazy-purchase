const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const connectionSting = app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the Eazy Purchase server!",
  });
});

module.exports = app;
