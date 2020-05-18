import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { SchemaLink } from "apollo-link-schema"
import schema from "./schema"

const initApolloSchemaClient = (ctx = {}) => {
  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context: ctx }),
    cache: new InMemoryCache()
  })
}


export default initApolloSchemaClient
