import Service from './Service.js';

class GendersService extends Service {
  constructor() {
    super();
  }

  async selectGenderIdByName(name) {
    const results = await this.database.query(
      `
        SELECT id FROM genders
        WHERE name ILIKE $1
      `,
      [name]
    );

    if (!results.rows.length) return null;

    return results.rows[0].id;
  }
}

export default GendersService;
