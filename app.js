const express = require("express");
const morgan = require("morgan");

const productRouter = require("./routes/productRouter");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/products", productRouter);

module.exports = app;
