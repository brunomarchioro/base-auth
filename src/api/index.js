import { ApolloServer } from "apollo-server-micro"
// import { withIronSession } from "next-iron-session"
import getAuth from "../lib/auth"
import schema from './schema'

let config = {
  schema,
  context: async (ctx) => {
    const auth = await getAuth(ctx)
    console.log('logged user', auth?.user)
    return { auth }
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

// export default withIronSession(apolloServer.createHandler({ path: "/api/graphql" }), {
//   password: process.env.SECRET_COOKIE_PASSWORD,
//   cookieName: 'base-auth/session',
//   cookieOptions: {
//     secure: process.env.NODE_ENV === 'production' ? true : false,
//   },
// })
