const express = require("express");
const morgan = require("morgan");

const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);

app.all("*", (req, res) => {
  const message = `Can't find ${req.originalUrl} for ${req.method} on the sever`;

  res.status(404).json({
    status: "fail",
    message,
  });
});

module.exports = app;
