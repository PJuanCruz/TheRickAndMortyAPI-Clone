import express from 'express';
import AppRouter from './../routes/index.js';
import notFound from '../middlewares/notFound.js';
import errorHandler from '../middlewares/errorHandler.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.router = new AppRouter();
  }

  init() {
    // this.configureMiddlewares();
    this.configureRoutes();
    this.configureEndwares();
    this.start();
  }

  configureRoutes() {
    this.app.head('/', (req, res, next) => res.sendStatus(200));
    this.app.use('/api', this.router.getRouter());
  }

  configureEndwares() {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  start() {
    try {
      this.app.listen(this.port, console.log(`✔ Server listening on ${this.port}...`));
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}

export default Server;
