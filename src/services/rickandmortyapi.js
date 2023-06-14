import fetch from 'node-fetch';

class RickAndMortyAPI {
  constructor() {
    this.baseURL = 'https://rickandmortyapi.com/api';
  }

  async fetchData() {
    try {
      const [locations, episodes, characters] = await Promise.all([
        this.fetchAllLocations(),
        this.fetchAllEpisodes(),
        this.fetchAllCharacters(),
      ]);

      return { locations, episodes, characters };
    } catch (error) {
      this._handleException(error);
    }
  }

  async fetchAllEpisodes(
    pageURL = `${this.baseURL}/episode`,
    allEpisodes = []
  ) {
    try {
      const response = await fetch(pageURL);
      const episodes = await response.json();
      const { info, results } = episodes;
      allEpisodes.push(...results);

      if (info.next) {
        return this.fetchAllEpisodes(info.next, allEpisodes);
      }

      return allEpisodes;
    } catch (error) {
      this._handleException(error);
    }
  }

  async fetchAllLocations(
    pageURL = `${this.baseURL}/location`,
    allLocations = []
  ) {
    try {
      const response = await fetch(pageURL);
      const locations = await response.json();
      const { info, results } = locations;
      allLocations.push(...results);

      if (info.next) {
        return this.fetchAllLocations(info.next, allLocations);
      }

      return allLocations;
    } catch (error) {
      this._handleException(error);
    }
  }

  async fetchAllCharacters(
    pageURL = `${this.baseURL}/character`,
    allCharacters = []
  ) {
    try {
      const response = await fetch(pageURL);
      const characters = await response.json();
      const { info, results } = characters;
      allCharacters.push(...results);

      if (info.next) {
        return this.fetchAllCharacters(info.next, allCharacters);
      }

      return allCharacters;
    } catch (error) {
      this._handleException(error);
    }
  }

  _handleException(error) {
    console.log('✖', error.detail || error);
  }
}

export default RickAndMortyAPI;
