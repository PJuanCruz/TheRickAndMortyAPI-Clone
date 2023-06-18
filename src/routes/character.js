import Router from './Router.js';
import CharacterController from './../controllers/character.js';

class CharacterRouter extends Router {
  constructor() {
    super();
    this.controller = new CharacterController();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.get('/:id', this._validateId, this.controller.getCharacterById);
    this.router.get('/', this.controller.getAllCharacters);
  }
}

export default CharacterRouter;
