const express = require("express");
const morgan = require("morgan");

const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// All routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);

// Middleware for handling unhandled routes
app.all("*", (req, res, next) => {
  const message = `Can't find ${req.originalUrl} for ${req.method} on the sever`;

  next(message);
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    error: err,
  });
});

module.exports = app;
