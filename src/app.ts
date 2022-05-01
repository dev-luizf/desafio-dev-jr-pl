import express from 'express';
import connectToDatabase from './connection';
import 'express-async-errors';
import GraphRouter from './routes/GraphRouter';
import joiError from './middlewares/joiError';
import errorHandler from './middlewares/errorHandler';

const graphRouter = new GraphRouter();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.routesAndHandlers();
  }

  public startServer(PORT: string | number = 3001): void {
    connectToDatabase();

    this.app.listen(PORT, () =>
      console.log(`Server running here 👉 http://localhost:${PORT}`));
  }

  public routesAndHandlers() {
    this.app.use('/graph', graphRouter.router);
    this.app.use(joiError);
    this.app.use(errorHandler);
  }

  public getApp() {
    return this.app;
  }
}

export default App;
