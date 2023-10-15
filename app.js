const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

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
  next(
    new AppError(
      `Can't find ${req.originalUrl} for ${req.method} on the sever`,
      404
    )
  );
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
