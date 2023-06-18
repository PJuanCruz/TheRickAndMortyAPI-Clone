import DocsController from '../controllers/docs.js';
import Router from './Router.js';

class DocsRouter extends Router {
  constructor() {
    super();
    this.controller = new DocsController();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.get('/docs', this.controller.getDocs);
    this.router.get('/', this.controller.getIndex);
  }
}

export default DocsRouter;
