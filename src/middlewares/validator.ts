import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

class JoiValidator {
  schema: Schema;

  constructor(schema: Schema) {
    this.schema = schema;
  }

  validateBody = (req: Request, _res: Response, next: NextFunction) => {
    const { error } = this.schema.validate(req.body);
    if (error) throw error;
    next();
  };
}

export default JoiValidator;
