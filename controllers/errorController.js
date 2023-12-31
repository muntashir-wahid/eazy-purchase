const AppError = require("../utils/appError");

const handleCastErrorDb = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleDuplicateFieldsErrorDb = (err) => {
  const duplicateFields = Object.keys(err.keyValue).join(", ");
  return new AppError(
    `Duplicate field value: ${duplicateFields}. Try again with another one.`,
    400
  );
};

const handleValidationErrorDb = (err) => {
  const errorFields = Object.keys(err.errors)
    .map((errorObj) => err.errors[errorObj].path)
    .join(", ");

  return new AppError(`Invalid input data: ${errorFields}.`, 400);
};

const handleJwtError = () =>
  new AppError("Invalid token. Please login again.", 401);

const handleExpiredTokenError = () =>
  new AppError("Your token has expired. Please login again!", 401);

const sendErrorProd = (err, res) => {
  // Our known errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong. Please try again after sometime.",
    });
  }
};

const sendErrorDev = (err, res) => {
  // Send the error along with message and status code
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    data: {
      error: err,
    },
  });
};

module.exports = (err, _, res, __) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  // Send full info of error on development
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // Send Error on production

    if (err.name === "CastError") err = handleCastErrorDb(err);

    if (err.code === 11000) err = handleDuplicateFieldsErrorDb(err);

    if (err.name === "ValidationError") err = handleValidationErrorDb(err);

    if (err.name === "JsonWebTokenError") err = handleJwtError();

    if (err.name === "TokenExpiredError") err = handleExpiredTokenError();

    sendErrorProd(err, res);
  }
};
