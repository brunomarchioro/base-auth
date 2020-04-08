import { AuthenticationError, UserInputError } from "apollo-server-micro"
import { getAuthToken, removeAuthToken, setAuthToken } from "../lib/auth"

export const resolvers = {
  Query: {
    async viewer(_parent, _args, ctx, _info) {
      try {
        const user = getAuthToken(ctx)
        return user
      } catch {
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        )
      }
    }
  },
  Mutation: {
    async login(_parent, args, ctx, _info) {
      let user = null
      if (args.password === "1234") {
        user = {
          id: "fakeId",
          email: "user@gmail.com"
        }
      }

      if (user) {
        setAuthToken(ctx, user)
        return user
      }

      throw new UserInputError("Invalid email and password combination")
    },

    async logout(_parent, _args, ctx, _info) {
      removeAuthToken(ctx)
      return true
    }
  }
}
