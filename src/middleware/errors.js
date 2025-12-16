const errorHandler = (err, req, res, next) => {
  console.log(err);
  let error = { ...err };

  error.message = err.message;

  if (err.name === "CastError") {
    const msg = `Bootcamp not found with id of ${err.value}`;
    error = new ErrorResponse(msg, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const msg = `Bootcamp already exists`;
    error = new ErrorResponse(msg, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const msg = Object.values(err.errors).map((item) => item.message);
    error = new ErrorResponse(msg, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export { errorHandler, ErrorResponse };
