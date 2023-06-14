import Controller from './Controller.js';
import LocationsService from './../services/locations.js';

class LocationController extends Controller {
  constructor() {
    super();
    this.service = new LocationsService();
  }

  getLocationById = this.catcher(async (req, res, next) => {
    const { id } = req.params;
    const { results } = await this.service.selectLocationById({ id });
    return res.status(200).json(results);
  });

  getAllLocations = this.catcher(async (req, res, next) => {
    const { page = '1', name = '', type = '', dimension = '' } = req.query;
    const { info, results } = await this.service.selectAllLocations({
      page,
      name,
      type,
      dimension,
    });
    return res.status(200).json({ info, results });
  });
}

export default LocationController;
