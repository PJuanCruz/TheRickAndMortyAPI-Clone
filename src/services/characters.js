import Service from './Service.js';

class CharactersService extends Service {
  constructor() {
    super();
    this.route = 'character';
  }

  async insertCharacter({
    id,
    name,
    status_id,
    species,
    type,
    gender_id,
    origin_id,
    location_id,
    image,
    url,
  }) {
    await this.database.query(
      `
        INSERT INTO characters (id, name, status_id, species, type, gender_id, origin_id, location_id, image, url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
      [
        id,
        name,
        status_id,
        species,
        type,
        gender_id,
        origin_id,
        location_id,
        image,
        url,
      ]
    );
  }

  async selectCharacterIdByUrl(url) {
    const results = await this.database.query(
      `
        SELECT id FROM characters
        WHERE url = $1
      `,
      [url]
    );

    if (!results.rows.length) return null;

    return results.rows[0].id;
  }

  async selectCharacterById({ id }) {
    const results = await this.database.query(
      `
        SELECT
          c.id,
          c.name,
          s.name AS status,
          c.species,
          c.type,
          g.name AS gender,
          jsonb_build_object('name', CASE WHEN origin.name IS NULL THEN 'unknown' ELSE origin.name END, 'url', CASE WHEN origin.name IS NULL THEN '' ELSE CONCAT('${this.basePath}/location/', origin.id::text) END) AS origin,
          jsonb_build_object('name', CASE WHEN location.name IS NULL THEN 'unknown' ELSE location.name END, 'url', CASE WHEN location.name IS NULL THEN '' ELSE CONCAT('${this.basePath}/location/', location.id::text) END) AS location,
          c.image,
          (
            SELECT
              jsonb_agg(CONCAT('${this.basePath}/episode/', e.id) ORDER BY e.id)
            FROM
              characters_episodes AS ce
            JOIN
              episodes AS e ON e.id = ce.episode_id
            WHERE
              ce.character_id = c.id
          ) AS episode,
          CONCAT('${this.basePath}/character/', c.id) AS url
        FROM
          characters AS c
        LEFT JOIN
          status AS s ON s.id = c.status_id
        LEFT JOIN
          genders AS g ON g.id = c.gender_id
        LEFT JOIN
          locations AS origin ON origin.id = c.origin_id
        LEFT JOIN
          locations AS location ON location.id = c.location_id
        WHERE
          c.id = $1
        GROUP BY
          c.id,
          c.name,
          s.name,
          c.species,
          c.type,
          g.name,
          origin.name,
          origin.id,
          location.name,
          location.id,
          c.image
        ORDER BY
          c.id ASC
      `,
      [id]
    );

    const response = { results: results.rows[0] };

    return response;
  }

  async selectAllCharacters({ page, name, status, species, type, gender }) {
    const results = await this.database.query(
      `
      SELECT
      c.id,
      c.name,
      s.name AS status,
      c.species,
      c.type,
      g.name AS gender,
      jsonb_build_object('name', CASE WHEN origin.name IS NULL THEN 'unknown' ELSE origin.name END, 'url', CASE WHEN origin.name IS NULL THEN '' ELSE CONCAT('${this.basePath}/location/', origin.id::text) END) AS origin,
      jsonb_build_object('name', CASE WHEN location.name IS NULL THEN 'unknown' ELSE location.name END, 'url', CASE WHEN location.name IS NULL THEN '' ELSE CONCAT('${this.basePath}/location/', location.id::text) END) AS location,
      c.image,
      jsonb_agg(CONCAT('${this.basePath}/episode/', e.id) ORDER BY e.id) AS episodes,
      CONCAT('${this.basePath}/character/', c.id) AS url,
      COUNT(*) OVER() AS count
    FROM characters AS c
    LEFT JOIN status AS s ON s.id = c.status_id
    LEFT JOIN genders AS g ON g.id = c.gender_id
    LEFT JOIN locations AS origin ON origin.id = c.origin_id
    LEFT JOIN locations AS location ON location.id = c.location_id
    LEFT JOIN characters_episodes AS ce ON c.id = ce.character_id
    LEFT JOIN episodes AS e ON e.id = ce.episode_id
    WHERE c.name ILIKE '%' || $1 || '%'
      AND s.name ILIKE '%' || $2 || '%'
      AND c.species ILIKE '%' || $3 || '%'
      AND c.type ILIKE '%' || $4 || '%'
      AND g.name ILIKE '%' || $5 || '%'
    GROUP BY c.id, c.name, s.name, c.species, c.type, g.name, origin.name, origin.id, location.name, location.id, c.image
    ORDER BY c.id ASC
    LIMIT ${this.itemsPerPage} OFFSET ($6 - 1) * ${this.itemsPerPage};
     `,
      [name, status, species, type, gender, page]
    );

    const response = {
      info: this._getInfo(page, results.rows[0].count, {
        name,
        status,
        species,
        type,
        gender,
      }),
      results: results.rows.map((row) => ({ ...row, count: undefined })),
    };

    return response;
  }
}

export default CharactersService;
