import { AuthenticationError, UserInputError } from "apollo-server-micro"
import SQL from "sql-template-strings"

export const resolvers = {
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

        const user = await db.get(SQL`
            SELECT * FROM users WHERE uuid = ${auth.user.uuid}
        `)

        console.log(user)

        return user
      } catch (e) {
        console.log(e)
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        )
      }
    },

    async user(_parent, { id }, { db }) {
      try {
        return db.get(SQL`SELECT * FROM users WHERE id = ${id}`)
      } catch {
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        )
      }
    },

    async users(_parent, _args, { db }) {
      try {
        console.log("fetch users list")
        return db.all(SQL`SELECT * FROM users`)
      } catch (error) {
        console.error(error)
      }
    },

    async post(_parent, { id }, { db }) {
      try {
        console.log("fetch post", id)
        return db.get(SQL`SELECT * FROM posts WHERE id = ${id}`)
      } catch (error) {
        console.error(error)
      }
    },

    async posts(_parent, { scopeCodename }, { db }) {
      try {
        console.log("fetch post list")
        const query = SQL`SELECT * FROM posts`
        if (scopeCodename) {
          query.append(SQL`
            LEFT JOIN posts_x_scopes on posts.id = posts_x_scopes.postId
            LEFT JOIN scopes on posts_x_scopes.scopeId = scopes.id
            WHERE
            scopes.codename = ${scopeCodename}
          `)
        }
        return db.all(query)
      } catch (error) {
        console.error(error)
      }
    },

    async scope(_parent, { codename }, { db }) {
      try {
        console.log("fetch scope", codename)
        return db.get(SQL`SELECT * FROM scopes WHERE codename = ${codename}`)
      } catch (error) {
        console.error(error)
      }
    },

    async scopes(_parent, _args, { db }) {
      try {
        console.log("fetch scope list")
        return db.all(SQL`SELECT * FROM scopes`)
      } catch (error) {
        console.error(error)
      }
    }
  },
  Mutation: {
    async login(_parent, { username, password }, { auth, db }) {
      const user = await db.get(SQL`SELECT * FROM users WHERE uuid = ${username}`)

      if (password === user.password) {
        await auth.set({ uuid: user.uuid })
        return user
      }

      throw new UserInputError("Invalid email and password combination")
    },

    async logout(_parent, _args, { auth }) {
      auth.destroy()
      return true
    },

    async createPost(_parent, args, { db }) {
      const result = await db.run(SQL`
        INSERT INTO posts
            (title, content)
        VALUES 
            (${args.title}, ${args.content})
      `)

      return db.get(SQL`SELECT * FROM posts WHERE id = ${result.lastID}`)
    },

    async updatePost(_parent, { id, ...args }, { db }) {
      await db.run(SQL`
        UPDATE posts SET
            title = ${args.title},
            content = ${args.content}
        WHERE
            id = ${id}
      `)

      return db.get(SQL`SELECT * FROM posts WHERE id = ${id}`)
    }
  }
}
