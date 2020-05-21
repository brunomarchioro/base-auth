import SQL from "sql-template-strings"

export default async function findPermissions(user, db) {
  return db.all(SQL`
          SELECT
              scopes.codename AS scope,
              content_types.codename AS contentType,
              roles
          FROM permissions
              LEFT JOIN groups on permissions.groupId = groups.id
              LEFT JOIN users_x_groups on groups.id = users_x_groups.groupId
              LEFT JOIN scopes on permissions.scopeId = scopes.id
              LEFT JOIN content_types on permissions.contentTypeId = content_types.id
          WHERE
              users_x_groups.userId = ${user.id}
        `)
}
