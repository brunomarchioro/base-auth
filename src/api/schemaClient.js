import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { SchemaLink } from "apollo-link-schema"
import getAuth from "../lib/auth"
import schema from "./schema"

const initApolloSchemaClient = async (ctx) => {
  let auth = { user: null }

  if (ctx?.req) {
    auth = await getAuth(ctx)
  }

  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context: { auth } }),
    cache: new InMemoryCache()
  })
}


export default initApolloSchemaClient
