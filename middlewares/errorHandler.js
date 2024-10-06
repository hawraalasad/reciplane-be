const errorHandler = (err, req, res, next) => {
  try {
    return res
      .status(err.status || 500)
      .json({ error: err || "Internal Server Error" });
  } catch (error) {
    next(error);
  }
};
module.exports = errorHandler;
