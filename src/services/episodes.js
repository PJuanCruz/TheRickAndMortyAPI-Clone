import Service from './Service.js';

class EpisodesService extends Service {
  constructor() {
    super();
    this.route = 'episode';
  }

  async insertEpisode({ id, name, air_date, episode_code, url }) {
    await this.database.query(
      `
        INSERT INTO episodes (id, name, air_date, episode_code, url)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [id, name, air_date, episode_code, url]
    );
  }

  async selectEpisodeById({ id }) {
    const results = await this.database.query(
      `
        SELECT
          e.id,
          e.name,
          e.air_date,
          e.episode_code AS episode,
          CASE
            WHEN COUNT(c.id) = 0 THEN '[]'::jsonb
            ELSE jsonb_agg(CONCAT('${this.basePath}/character/', c.id) ORDER BY c.id)
          END AS characters,
          CONCAT('${this.basePath}/episode/', e.id) AS url
        FROM
          episodes AS e
        JOIN
          characters_episodes AS ce ON e.id = ce.episode_id
        JOIN
          characters AS c ON c.id = ce.character_id
        WHERE
          e.id = $1
        GROUP BY
          e.id,
          e.name,
          e.air_date,
          e.episode_code
        ORDER BY
          e.id ASC
      `,
      [id]
    );

    if (!results.rows[0]) {
      return this._throwError({ status: 404, message: 'Episode not found' });
    }

    const response = { results: results.rows[0] };

    return response;
  }

  async selectAllLEpisodes({ page, name, episode }) {
    const results = await this.database.query(
      `
      SELECT
      e.id,
      e.name,
      e.air_date,
      e.episode_code,
      jsonb_agg(CONCAT('${this.basePath}/character/', c.id) ORDER BY c.id) AS characters,
      CONCAT('${this.basePath}/episode/', e.id) AS url,
      COUNT(*) OVER() AS count
    FROM episodes AS e
    LEFT JOIN characters_episodes AS ce ON e.id = ce.episode_id
    LEFT JOIN characters AS c ON c.id = ce.character_id
    WHERE e.name ILIKE '%' || $1 || '%'
      AND e.episode_code ILIKE '%' || $2 || '%'
    GROUP BY e.id, e.name, e.air_date, e.episode_code
    ORDER BY e.id ASC
    LIMIT ${this.itemsPerPage} OFFSET ($3 - 1) * ${this.itemsPerPage};
     `,
      [name, episode, page]
    );

    if (!results.rows[0]) {
      return this._throwError({ status: 404, message: 'There is nothing here' });
    }

    const response = {
      info: this._getInfo(page, results.rows[0].count, {
        name,
        episode,
      }),
      results: results.rows.map((row) => ({ ...row, count: undefined })),
    };

    return response;
  }
}

export default EpisodesService;
