import { ApolloServer } from "apollo-server-micro"
import { open } from "sqlite"
import sqlite3 from "sqlite3"
import getAuth from "../lib/auth"
import { makeExecutableSchema } from "apollo-server-micro"
import { resolvers } from "./resolvers"
import { typeDefs } from "./type-defs"

const openDb = () => open({
  filename: 'data/dev.db',
  driver: sqlite3.Database
})

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export const getContext = async (ctx) => {
  const db = await openDb()
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

// export default withIronSession(apolloServer.createHandler({ path: "/api/graphql" }), {
//   password: process.env.SECRET_COOKIE_PASSWORD,
//   cookieName: 'base-auth/session',
//   cookieOptions: {
//     secure: process.env.NODE_ENV === 'production' ? true : false,
//   },
// })
