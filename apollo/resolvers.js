import { AuthenticationError, UserInputError } from "apollo-server-micro"
import low from "lowdb"
import FileSync from "lowdb/adapters/FileSync"
import { getAuthToken, removeAuthToken, setAuthToken } from "../lib/auth"
import faker from "faker"

const adapter = new FileSync("data/db.json")
const db = low(adapter)

export const resolvers = {
  Query: {
    async authenticatedUser(_parent, _args, ctx) {
      try {
        const { username } = getAuthToken(ctx)
        return db.get("users").find({ username }).value()
      } catch {
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        )
      }
    },

    async user(_parent, { userId }) {
      try {
        return db.get("users").find({ userId }).value()
      } catch {
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        )
      }
    },

    async users() {
      try {
        console.log("fetch post list")
        return db.get("users").value()
      } catch (error) {
        console.error(error)
      }
    },

    async post(_parent, { postId }, ctx) {
      try {
        console.log("fetch post", postId)
        return db.get("posts").find({ postId }).value()
      } catch (error) {
        console.error(error)
      }
    },

    async posts(_parent, _args, ctx, _info) {
      try {
        console.log("fetch post list")
        return db.get("posts").value()
      } catch (error) {
        console.error(error)
      }
    }

  },
  Mutation: {
    async login(_parent, { username, password }, ctx) {
      let user = db.get("users").find({ username }).value()

      if (password === user.password) {
        setAuthToken(ctx, username)
        return user
      }

      throw new UserInputError("Invalid email and password combination")
    },

    async logout(_parent, _args, ctx) {
      removeAuthToken(ctx)
      return true
    },

    async createPost(_parent, args, ctx) {
      const post = {
        postId: faker.random.uuid(),
        ...args
      }
      db.get("posts").push(post).write()
      return post
    },

    async updatePost(_parent, { postId, ...args }, ctx) {
      db.get("posts").find({ postId }).assign(args).write()
      return db.get("posts").find({ v }).value()
    }
  }
}
