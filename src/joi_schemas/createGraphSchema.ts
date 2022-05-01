import Joi, { Schema } from 'joi';

const createGraphSchema: Schema = Joi.object({
  data: Joi.array().min(1).required().items(
    Joi.object({
      source: Joi.string().required(),
      target: Joi.string().required(),
      distance: Joi.number().required(),
    }),
  ),
});

export default createGraphSchema;
