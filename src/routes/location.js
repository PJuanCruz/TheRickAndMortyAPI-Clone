import Router from './Router.js';
import LocationController from './../controllers/location.js';

class LocationRouter extends Router {
  constructor() {
    super();
    this.controller = new LocationController();
    this.configureRoutes();
  }

  configureRoutes() {
    this.router.get('/:id', this.controller.getLocationById);
    this.router.get('/', this.controller.getAllLocations);
  }
}

export default LocationRouter;
