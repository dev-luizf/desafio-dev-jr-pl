import { GraphController } from '../controllers';
import IGraph from '../interfaces/GraphInterface';
import createGraphSchema from '../joi_schemas/createGraphSchema';
import JoiValidator from '../middlewares/validator';
import BaseRouter from './BaseRouter';

class GraphRouter extends BaseRouter<IGraph> {
  constructor(
    controller = new GraphController(),
    createValidator = new JoiValidator(createGraphSchema),
    updateValidator = undefined,
  ) {
    super(controller, createValidator, updateValidator);
  }
}

export default GraphRouter;
