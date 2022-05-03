import APIError from '../helpers/APIError';
import IGraph, { IEdge } from '../interfaces/GraphInterface';
import GraphModel from '../models/Graph';
import BaseService from './Service';

class Graph extends BaseService<IGraph> {
  equalRoutes = 0;

  constructor(model = new GraphModel()) {
    super(model);
  }

  verifyEqualRoutes(route: IEdge, otherRoute: IEdge) {
    const targetsAreEqual = route.target === otherRoute.target;
    const sourcesAreEqual = route.source === otherRoute.source;

    if (targetsAreEqual && sourcesAreEqual) {
      this.equalRoutes += 1;
      if (this.equalRoutes > 0) {
        throw new APIError('Routes cant be equal', 'badRequest');
      }
    }
  }

  verifyEqualCities(route: IEdge) {
    if (route.source === route.target) {
      throw new APIError('Routes must have different target and source', 'badRequest');
    }
  }
  
  async create(payload: IGraph): Promise<IGraph> {
    this.equalRoutes = 0; // restart equal routes counter
    payload.data.forEach((route, index) => {
      this.verifyEqualCities(route); // verify if route target is equal to route source
  
      payload.data.forEach((otherRoute, otherIndex) => {
        if (index !== otherIndex) { // avoid check same array element
          this.verifyEqualRoutes(route, otherRoute); // verify if there are equal routes
        }
      });
    });
    
    const result = await this.model.create(payload);
    return result;
  }
}

export default Graph;
