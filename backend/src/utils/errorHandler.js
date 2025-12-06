const errorResponse = (res, statusCode, message, error = null) => {
  const response = {
    success: false,
    message: message,
  };

  // Solo incluir detalles del error en desarrollo
  if (process.env.NODE_ENV === "development" && error) {
    response.error = error.message;
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

module.exports = { errorResponse };
