import * as Joi from 'joi';
import { ErrorRequestHandler } from 'express';

const joiError: ErrorRequestHandler = (err, _req, res, next) => {
  if (!Joi.isError(err)) return next(err);
  const code = 400;

  // const errorType = err.details[0].type;

  // if (errorType.match(/required/i) || errorType.match(/empty/i)) code = 400 
  // else if(errorType.match(/min/i)) code = 400
  // else code = 422;

  return res.status(code).json({ error: err.message });
};

export default joiError;
