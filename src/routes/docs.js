import Router from './Router.js';

class DocsRouter extends Router {
  constructor() {
    super();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.get('/', (req, res, next) => {
      return res
        .status(301)
        .redirect('https://documenter.getpostman.com/view/23055576/2s93si1prk');
    });
  }
}

export default DocsRouter;
