import Seeder from './index.js';
import Database from './../index.js';
import RickAndMortyAPI from './../../services/rickandmortyapi.js';
import StatusService from './../../services/status.js';
import GendersService from './../../services/genders.js';
import LocationsService from './../../services/locations.js';
import EpisodesService from './../../services/episodes.js';
import CharactersService from './../../services/characters.js';
import CharactersEpisodesService from './../../services/charactersEpisodes.js';

const seeder = new Seeder(
  Database,
  RickAndMortyAPI,
  StatusService,
  GendersService,
  LocationsService,
  EpisodesService,
  CharactersService,
  CharactersEpisodesService
);

seeder.run();
