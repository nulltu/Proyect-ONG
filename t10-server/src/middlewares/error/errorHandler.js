/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const errorHandler = (err, req, res, next) => {
  console.log(err.output);
  return res.status(err.output.statusCode).json(err.output.payload);
};

module.exports = errorHandler;
