import db from "api/connectors/pgsql"
import { sql } from "slonik"

export default async ({ id }) => {
  return db.any(sql`
    SELECT
      name
    FROM groups
      LEFT JOIN users_x_groups ON groups.id = users_x_groups.id
    WHERE
      users_x_groups.user_id = ${id}
  `)
}
