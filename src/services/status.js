import Service from './Service.js';

class StatusService extends Service {
  constructor() {
    super();
  }

  async selectStatusIdByName(name) {
    const results = await this.database.query(
      `
        SELECT id FROM status
        WHERE name ILIKE $1
      `,
      [name]
    );

    if (!results.rows.length) return null;

    return results.rows[0].id;
  }
}

export default StatusService;
