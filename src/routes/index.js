import Router from './Router.js';
import CharacterRouter from './character.js';
import EpisodeRouter from './episode.js';
import LocationRouter from './location.js';

class AppRouter extends Router {
  constructor() {
    super();
    this.characterRouter = new CharacterRouter();
    this.episodeRouter = new EpisodeRouter();
    this.locationRouter = new LocationRouter();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.use('/character', this.characterRouter.getRouter());
    this.router.use('/episode', this.episodeRouter.getRouter());
    this.router.use('/location', this.locationRouter.getRouter());
  }
}

export default AppRouter;
