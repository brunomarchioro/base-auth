import { AuthenticationError, UserInputError } from "apollo-server-micro"
import { separateOperations } from "graphql"
import low from "lowdb"
import FileSync from "lowdb/adapters/FileSync"
import faker from "faker"

const adapter = new FileSync("data/db.json")
const db = low(adapter)

export const resolvers = {
  Query: {
    async authenticatedUser(_parent, _args, { auth }) {
      try {
        if (!auth?.user) return null
        return db.get("users").find({ username: auth.user.username }).value()
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

    async posts(_parent, { scopeCodename }, ctx, _info) {
      try {
        console.log("fetch post list")
        const posts = db.get("posts")
        if (scopeCodename) {
          posts.find({  })
        }
        return
      } catch (error) {
        console.error(error)
      }
    },

    async scope(_parent, { codename }, ctx) {
      try {
        console.log("fetch scope", codename)
        return db.get("scopes").find({ codename }).value()
      } catch (error) {
        console.error(error)
      }
    },

    async scopes(_parent, _args, ctx, _info) {
      try {
        console.log("fetch scope list")
        return db.get("scopes").value()
      } catch (error) {
        console.error(error)
      }
    }
  },
  Mutation: {
    async login(_parent, { username, password }, { auth }) {
      let user = db.get("users").find({ username }).value()

      if (password === user.password) {
        await auth.set(user)
        return user
      }

      throw new UserInputError("Invalid email and password combination")
    },

    async logout(_parent, _args, { auth }) {
      auth.destroy()
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
      return db.get("posts").find({ postId }).value()
    }
  }
}
