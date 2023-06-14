import Controller from './Controller.js';
import EpisodesService from './../services/episodes.js';

class EpisodeController extends Controller {
  constructor() {
    super();
    this.service = new EpisodesService();
  }

  getEpisodeById = this.catcher(async (req, res, next) => {
    const { id } = req.params;
    const { results } = await this.service.selectEpisodeById({ id });
    return res.status(200).json(results);
  });

  getAllEpisodes = this.catcher(async (req, res, next) => {
    const { page = '1', name = '', episode = '' } = req.query;
    const { info, results } = await this.service.selectAllLEpisodes({
      page,
      name,
      episode,
    });
    return res.status(200).json({ info, results });
  });
}

export default EpisodeController;
