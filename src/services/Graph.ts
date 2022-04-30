import IGraph from '../interfaces/GraphInterface';
import GraphModel from '../models/Graph';
import BaseService from './Service';

class Graph extends BaseService<IGraph> {
  constructor(model = new GraphModel()) {
    super(model);
  }
}

export default Graph;
