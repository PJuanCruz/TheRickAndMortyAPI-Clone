import express from 'express';

class Router {
  constructor() {
    this.router = express.Router();
  }

  configureRoutes() {}

  getRouter() {
    return this.router;
  }

  _validateId(req, res, next) {
    const { id } = req.params;

    if (parseInt(id, 10).toString() !== id) {
      const error = new Error();
      error.status = 500;
      error.message = 'Hey! you must provide an id';

      throw error;
    }

    next();
  }
}

export default Router;
