import * as dotenv from 'dotenv';
import Database from './../index.js';

dotenv.config();

class Migration {
  constructor() {
    this.database = new Database();
  }

  async up() {
    await Promise.all([
      this._createStatusTable(),
      this._createGendersTable(),
      this._createLocationsTable(),
      this._createEpisodesTable(),
    ]);
    await this._createCharactersTable();
    await this._createCharactersEpisodesTable();

    console.log('✔ Migration completed successfully.');
  }

  async down() {
    await this._dropCharactersEpisodesTable(),
    await this._dropCharactersTable(),
    await Promise.all([
      this._dropEpisodesTable(),
      this._dropLocationsTable(),
      this._dropGendersTable(),
      this._dropStatusTable(),
    ]);

    console.log('✔ Migration rollback completed successfully.');
  }

  _createStatusTable() {
    return this.database.query(`
      CREATE TABLE IF NOT EXISTS status (
        id SERIAL PRIMARY KEY,
        name VARCHAR (50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      INSERT INTO status (name)
      VALUES
        ('Alive'),
        ('Dead'),
        ('unknown');
    `);
  }

  _dropStatusTable() {
    return this.database.query(`
      DROP TABLE IF EXISTS status;
    `);
  }

  _createGendersTable() {
    return this.database.query(`
      CREATE TABLE IF NOT EXISTS genders (
      id SERIAL PRIMARY KEY,
        name VARCHAR (50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      INSERT INTO genders (name)
      VALUES
        ('Female'),
        ('Male'),
        ('Genderless'),
        ('unknown');
    `);
  }

  _dropGendersTable() {
    return this.database.query(`
      DROP TABLE IF EXISTS genders;
    `);
  }

  _createLocationsTable() {
    return this.database.query(`
      CREATE TABLE IF NOT EXISTS locations (
        id INT PRIMARY KEY,
        name VARCHAR (255) UNIQUE NOT NULL,
        type VARCHAR(50),
        dimension VARCHAR(50),
        url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  _dropLocationsTable() {
    return this.database.query(`
      DROP TABLE IF EXISTS locations;
    `);
  }

  _createEpisodesTable() {
    return this.database.query(`
      CREATE TABLE IF NOT EXISTS episodes (
        id INT PRIMARY KEY,
        name VARCHAR (255) UNIQUE NOT NULL,
        air_date DATE,
        episode_code VARCHAR(20),
        url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  _dropEpisodesTable() {
    return this.database.query(`
      DROP TABLE IF EXISTS episodes;
    `);
  }

  _createCharactersTable() {
    return this.database.query(`
      CREATE TABLE IF NOT EXISTS characters (
        id INT PRIMARY KEY,
        name VARCHAR (255) NOT NULL,
        status_id INT NOT NULL,
        species VARCHAR(50),
        type VARCHAR(50),
        gender_id INT NOT NULL,
        origin_id INT,
        location_id INT,
        image VARCHAR(255),
        url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (status_id) REFERENCES status(id),
        FOREIGN KEY (gender_id) REFERENCES genders(id),
        FOREIGN KEY (origin_id) REFERENCES locations(id),
        FOREIGN KEY (location_id) REFERENCES locations(id)
      );
    `);
  }

  _dropCharactersTable() {
    return this.database.query(`
      DROP TABLE IF EXISTS characters;
    `);
  }

  _createCharactersEpisodesTable() {
    return this.database.query(`
      CREATE TABLE IF NOT EXISTS characters_episodes (
        character_id INT,
        episode_id INT,
        PRIMARY KEY (character_id, episode_id),
        FOREIGN KEY (character_id) REFERENCES characters(id),
        FOREIGN KEY (episode_id) REFERENCES episodes(id)
      );
    `);
  }

  _dropCharactersEpisodesTable() {
    return this.database.query(`
      DROP TABLE IF EXISTS characters_episodes;
    `);
  }
}

export default Migration;
