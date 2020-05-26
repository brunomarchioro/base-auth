import db from "api/connectors/pgsql"
import { sql } from "slonik"

export default async (userId) => {
  return db.any(sql`
    SELECT
      name
    FROM groups
      LEFT JOIN users_x_groups ON groups.group_id = users_x_groups.user_x_group_id
    WHERE
      users_x_groups.user_id = ${userId}
  `)
}
