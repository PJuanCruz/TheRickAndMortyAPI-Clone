import * as dotenv from 'dotenv';
import Database from './../index.js';
import RickAndMortyAPI from './../../services/rickandmortyapi.js';
import StatusService from './../../services/status.js';
import GendersService from './../../services/genders.js';
import LocationsService from './../../services/locations.js';
import EpisodesService from './../../services/episodes.js';
import CharactersService from './../../services/characters.js';
import CharactersEpisodesService from './../../services/charactersEpisodes.js';

dotenv.config();

class Seeder {
  constructor() {
    this.rickandmortyAPI = new RickAndMortyAPI();
    this.statusService = new StatusService(Database);
    this.gendersService = new GendersService(Database);
    this.locationsService = new LocationsService(Database);
    this.episodesService = new EpisodesService(Database);
    this.charactersService = new CharactersService(Database);
    this.charactersEpisodesService = new CharactersEpisodesService(Database);
  }

  async run() {
    const { locations, episodes, characters } =
      await this.rickandmortyAPI.fetchData();

    const locationsPromises = this.generateLocationsPromises(locations);
    const episodesPromises = this.generateEpisodesPromises(episodes);
    await Promise.all([...locationsPromises, ...episodesPromises]);
    const charactersPromises = this.generateCharactersPromises(characters);
    await Promise.all([...charactersPromises]);
    const charactersEpisodesPromises =
      this.generateCharactersEpisodesPromises(episodes);
    await Promise.all([...charactersEpisodesPromises]);

    console.log('✔');
  }

  generateLocationsPromises(locations) {
    return locations.map((location) => {
      return this.locationsService.insertLocation({
        id: location.id,
        name: location.name,
        type: location.type,
        dimension: location.dimension,
        url: location.url,
      });
    });
  }

  generateEpisodesPromises(episodes) {
    return episodes.map((episode) => {
      return this.episodesService.insertEpisode({
        id: episode.id,
        name: episode.name,
        air_date: episode.air_date,
        episode_code: episode.episode,
        url: episode.url,
      });
    });
  }

  generateCharactersPromises(characters) {
    return characters.map(async (character) => {
      const [status_id, gender_id, origin_id, location_id] = await Promise.all([
        this.statusService.selectStatusIdByName(character.status),
        this.gendersService.selectGenderIdByName(character.gender),
        this.locationsService.selectLocationIdByName(character.origin.name),
        this.locationsService.selectLocationIdByName(character.location.name),
      ]);

      return this.charactersService.insertCharacter({
        id: character.id,
        name: character.name,
        status_id,
        species: character.species,
        type: character.type,
        gender_id,
        origin_id,
        location_id,
        image: character.image,
        url: character.url,
      });
    });
  }

  generateCharactersEpisodesPromises(episodes) {
    const allPromises = [];

    for (const episode of episodes) {
      const currentPromises = episode.characters.map(async (character) => {
        const characterId = await this.charactersService.selectCharacterIdByUrl(
          character
        );

        return this.charactersEpisodesService.insertCharactersEpisodes({
          character_id: characterId,
          episode_id: episode.id,
        });
      });

      allPromises.push(...currentPromises);
    }

    return allPromises;
  }
}

export default Seeder;
