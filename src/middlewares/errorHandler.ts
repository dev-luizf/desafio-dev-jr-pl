import { ErrorRequestHandler } from 'express';
import APIError from '../helpers/APIError';

enum ErrorMap {
  alreadyExists = 409,
  notFound = 404,
  badRequest = 400,
  unauthorized = 401,
  serverError = 500,
}

const errorHandler: ErrorRequestHandler = (
  err: APIError | Error,
  _req,
  res,
  next,
) => {
  // unexpected error
  const hasCodeProperty = Object.prototype.hasOwnProperty.call(err, 'code');
  if (!hasCodeProperty) {
    if (err.name === 'SyntaxError') {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
    
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
  }

  const apiError = err as APIError;
  const statusCode: number = ErrorMap[apiError.code];

  // domain error
  res.status(statusCode).json({ error: err.message });
  next(err);
};

export default errorHandler;
