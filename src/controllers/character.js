import Controller from './Controller.js';
import CharacterService from './../services/characters.js';

class CharacterController extends Controller {
  constructor() {
    super();
    this.service = new CharacterService();
  }

  getCharacterById = this.catcher(async (req, res, next) => {
    const { id } = req.params;
    const { results } = await this.service.selectCharacterById({ id });
    return res.status(200).json(results);
  });

  getAllCharacters = this.catcher(async (req, res, next) => {
    const {
      page = '1',
      name = '',
      status = '',
      species = '',
      type = '',
      gender = '',
    } = req.query;
    const { info, results } = await this.service.selectAllCharacters({
      page,
      name,
      status,
      species,
      type,
      gender,
    });
    return res.status(200).json({ info, results });
  });
}

export default CharacterController;
