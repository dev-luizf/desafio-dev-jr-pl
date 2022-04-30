import { Schema, Document, model as createModel } from 'mongoose';
import IGraph from '../interfaces/GraphInterface';
import MongoModel from './Model';

interface GraphDocument extends IGraph, Document {}

const edgeSchema = new Schema({
  source: { type: String, required: true },
  target: { type: String, required: true },
  distance: { type: Number, required: true },
});

export const graphSchema = new Schema<GraphDocument>({
  data: {
    type: [edgeSchema],
    required: true,
  },
});

class GraphModel extends MongoModel<IGraph> {
  constructor(model = createModel('Graphs', graphSchema)) {
    super(model);
  }
}

export default GraphModel;
