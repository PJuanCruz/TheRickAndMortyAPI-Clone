import Router from './Router.js';
import EpisodeController from './../controllers/episode.js';

class EpisodeRouter extends Router {
  constructor() {
    super();
    this.controller = new EpisodeController();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.get('/:id', this._validateId, this.controller.getEpisodeById);
    this.router.get('/', this.controller.getAllEpisodes);
  }
}

export default EpisodeRouter;
