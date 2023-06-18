import Service from './Service.js';

class LocationsService extends Service {
  constructor() {
    super();
    this.route = 'location';
  }

  async insertLocation({ id, name, type, dimension, url }) {
    await this.database.query(
      `
        INSERT INTO locations (id, name, type, dimension, url)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [id, name, type, dimension, url]
    );
  }

  async selectLocationIdByName(name) {
    const results = await this.database.query(
      `
        SELECT id FROM locations
        WHERE name ILIKE $1
      `,
      [name]
    );

    if (!results.rows.length) return null;

    return results.rows[0].id;
  }

  async selectLocationById({ id }) {
    if (parseInt(id, 10).toString() !== id) {
      return this._throwError({ status: 500, message: 'Hey! you must provide an id' });
    }

    const results = await this.database.query(
      `
        SELECT
          l.id,
          l.name,
          l.type,
          l.dimension,
          CASE
            WHEN COUNT(c.id) = 0 THEN '[]'::jsonb
            ELSE jsonb_agg(CONCAT('${this.basePath}/character/', c.id) ORDER BY c.id)
          END AS residents,
          CONCAT('${this.basePath}/location/', l.id) AS url
        FROM
          locations AS l
        LEFT JOIN
          characters AS c ON l.id = c.location_id
        WHERE
          l.id = $1
        GROUP BY
          l.id,
          l.name,
          l.type,
          l.dimension
        ORDER BY
          l.id ASC
      `,
      [id]
    );

    if (!results.rows[0]) {
      return this._throwError({ status: 404, message: 'Location not found' });
    }

    const response = { results: results.rows[0] };

    return response;
  }

  async selectAllLocations({ page, name, type, dimension }) {
    const results = await this.database.query(
      `
        SELECT
          l.id,
          l.name,
          l.type,
          l.dimension,
          jsonb_agg(CONCAT('${this.basePath}/character/', r.id) ORDER BY r.id) AS residents,
          CONCAT('${this.basePath}/location/', l.id) AS url,
          COUNT(*) OVER() AS count
        FROM locations AS l
        LEFT JOIN (
          SELECT location_id, id
          FROM characters
          ORDER BY id ASC
        ) AS r ON l.id = r.location_id
        WHERE l.name ILIKE '%' || $1 || '%'
          AND l.type ILIKE '%' || $2 || '%'
          AND l.dimension ILIKE '%' || $3 || '%'
        GROUP BY l.id, l.name, l.type, l.dimension
        ORDER BY l.id ASC
        LIMIT ${this.itemsPerPage} OFFSET ($4 - 1) * ${this.itemsPerPage}; 
     `,
      [name, type, dimension, page]
    );

    const response = {
      info: this._getInfo(page, results.rows[0].count, {
        name,
        type,
        dimension,
      }),
      results: results.rows.map((row) => ({ ...row, count: undefined })),
    };

    return response;
  }
}

export default LocationsService;
