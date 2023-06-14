import Service from './Service.js';

class CharactersEpisodesService extends Service {
  constructor() {
    super();
  }

  async insertCharactersEpisodes({ character_id, episode_id }) {
    await this.database.query(
      `
        INSERT INTO characters_episodes (character_id, episode_id)
        VALUES ($1, $2)
      `,
      [character_id, episode_id]
    );
  }
}

export default CharactersEpisodesService;
