import { ApolloServer } from "apollo-server-micro"
import { getAuth } from "lib/api/auth"
import { makeExecutableSchema } from "apollo-server-micro"
import resolvers from "./resolvers"
import db from "api/connectors/pgsql"
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'

const typeDefs = mergeTypes(fileLoader('src/api/types'), { all: true });

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export const getContext = async (ctx) => {
  let auth = { user: null }

  if (ctx?.req) {
    auth = await getAuth(ctx)
  }

  console.log('logged user', auth?.user)
  return { auth, db }
}

let config = {
  schema,
  context: getContext
}

if (process.env.NODE_ENV === "production") {
  config = {
    ...config,
    playground: false,
  }
}

const apolloServer = new ApolloServer(config)

export default apolloServer.createHandler({ path: "/api/graphql" })
