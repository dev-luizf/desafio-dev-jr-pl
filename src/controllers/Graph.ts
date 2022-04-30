import IGraph from '../interfaces/GraphInterface';
import { GraphService } from '../services';
import BaseController from './Controller';

class GraphController extends BaseController<IGraph> {
  constructor(model = new GraphService()) {
    super(model);
  }
}

export default GraphController;
