import db from "api/connectors/pgsql"
import { sql } from "slonik"

export default async ({ id }) => {
  return db.any(sql`
    SELECT
      scopes.codename AS scope,
      content_types.codename AS contentType,
      roles
    FROM permissions
      LEFT JOIN groups on permissions.group_id = groups.id
      LEFT JOIN users_x_groups on groups.id = users_x_groups.group_id
      LEFT JOIN scopes on permissions.scope_id = scopes.id
      LEFT JOIN content_types on permissions.content_type_id = content_types.id
    WHERE
      users_x_groups.user_id = ${id}
  `)
}
