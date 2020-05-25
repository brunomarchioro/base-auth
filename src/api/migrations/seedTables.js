import { sql } from "slonik"
import db from "api/connectors/pgsql"

export default async () => {
  await db.query(sql`
    INSERT INTO
      groups (name, codename)
    VALUES
      ('admin', 'Administrador');

    INSERT INTO
      scopes (codename, name, is_default)
    VALUES
      ('main', 'Principal', TRUE);

    INSERT INTO
      content_types (codename, name)
    VALUES
      ('posts', 'Notícias');

    INSERT INTO
      content_types_x_scopes (content_type_id, scopeid)
    VALUES
      (1, 1);

    INSERT INTO
      posts_status (codename, name)
    VALUES
      ('published', 'Publicado');
  `)
}

