export interface IEdge {
  source: string;
  target: string;
  distance: number;
}

interface IGraph {
  data: IEdge[]
}

export default IGraph;
