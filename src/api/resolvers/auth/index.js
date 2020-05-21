import { AuthenticationError } from "apollo-server-micro"
import SQL from "sql-template-strings"
import login from "./login"
import logout from "./logout"

export default {
  AuthenticatedUser: {
    fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,

    async groups({ id }, _args, { db }) {
      const groups = await db.all(SQL`
          SELECT
              name
          FROM groups
              LEFT JOIN users_x_groups on groups.id = users_x_groups.groupId
          WHERE
              users_x_groups.userId = ${id}
      `)
      return groups.map(group => group.name)
    },

    async permissions({ id }, _args, { db }) {
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
            users_x_groups.userId = ${id}
      `)
    },
  },

  Query: {
    async authenticatedUser(_parent, _args, { auth, db }) {
      try {
        if (!auth?.user) return null

        console.log(auth.user)

        // const user = await db.get(SQL`
        //     SELECT * FROM users WHERE uuid = ${auth.user.uuid}
        // `)
        //
        // console.log(user)

        // return user
        return auth.user
      } catch (e) {
        console.log(e)
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        )
      }
    },
  },

  Mutation: {
    login, logout
  }
}
