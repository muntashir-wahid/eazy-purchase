class AppError extends Error {
  constructor(message, statusCode) {
    // Call the parent call to generate error message
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    this.isOperational = true;

    // Capture StackTrace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
