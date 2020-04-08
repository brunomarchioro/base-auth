import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'
import { getAuthToken } from "../../lib/auth"

const apolloServer = new ApolloServer({
  schema,
  context(ctx) {
    const user = getAuthToken(ctx)
    return { ...ctx, user }
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
