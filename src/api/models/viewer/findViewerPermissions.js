import db from "api/connectors/pgsql"
import { sql } from "slonik"

export default async (userId) => {
  return db.any(sql`
    SELECT
      scopes.codename AS scope,
      content_types.codename AS contentType,
      roles
    FROM permissions
      LEFT JOIN groups on permissions.group_id = groups.group_id
      LEFT JOIN users_x_groups on groups.group_id = users_x_groups.group_id
      LEFT JOIN scopes on permissions.scope_id = scopes.scope_id
      LEFT JOIN content_types on permissions.content_type_id = content_types.content_type_id
    WHERE
      users_x_groups.user_id = ${userId}
  `)
}
