import SQL from "sql-template-strings"

export default async (user, db) => {
  return db.all(SQL`
    SELECT
      scopes.codename AS scope,
      content_types.codename AS contenttype,
      roles
    FROM permissions
      LEFT JOIN groups ON permissions.groupid = groups.id
      LEFT JOIN users_x_groups ON groups.id = users_x_groups.groupid
      LEFT JOIN scopes ON permissions.scopeid = scopes.id
      LEFT JOIN content_types ON permissions.contenttypeid = content_types.id
    WHERE
      users_x_groups.userid = ${user.id}
  `)
}
