import pg from 'pg';

const { Pool } = pg;

class Database extends Pool {
  constructor() {
    super({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    });
  }

  async checkConnection() {
    try {
      await super.query('SELECT NOW()');
      console.log('✔ Database connection has been established successfully.');
    } catch (error) {
      console.error('✖ Unable to connect to the database :\n', error);
      process.exit(1);
    }
  }

  async query(query, params) {
    try {
      return await super.query(query, params);
    } catch (error) {
      this._handleException(error);
    }
  }

  _handleException(error) {
    console.error('✖', error.detail || error);
  }
}

export default Database;
