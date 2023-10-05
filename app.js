const express = require("express");
const morgan = require("morgan");

const productRouter = require("./routes/productRouter");

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/products", productRouter);

module.exports = app;
