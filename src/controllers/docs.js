import Controller from './Controller.js';

class DocsController extends Controller {
  constructor() {
    super();
    this.basePath = `${process.env.HOST}/api`;
    this.docsURL = 'https://documenter.getpostman.com/view/23055576/2s93si1prk';
  }

  getDocs = this.catcher(async (req, res, next) => {
    return res.status(301).redirect(this.docsURL);
  });

  getIndex = this.catcher(async (req, res, next) => {
    const results = {
      characters: `${this.basePath}/character`,
      locations: `${this.basePath}/location`,
      episodes: `${this.basePath}/episode`,
    };

    return res.status(200).json(results);
  });
}

export default DocsController;
