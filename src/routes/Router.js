import express from 'express';

class Router {
  constructor() {
    this.router = express.Router();
  }

  configureRoutes() {}

  getRouter() {
    return this.router;
  }
}

export default Router;
