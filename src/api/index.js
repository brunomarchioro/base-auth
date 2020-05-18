import { ApolloServer } from "apollo-server-micro"
import { getAuthToken } from "../lib/auth"
import schema from './schema'

let config = {
  schema,
  context: async (ctx) => {
    const user = getAuthToken(ctx)
    return { ...ctx, user }
  }
}

if (process.env.NODE_ENV === "production") {
  config = {
    ...config,
    playground: false,
  }
}

const apolloServer = new ApolloServer(config)

export default apolloServer.createHandler({ path: "/api/graphql" })

