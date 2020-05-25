import { getContext, schema } from "api/index"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { SchemaLink } from "apollo-link-schema"

const initApolloSchemaClient = async (ctx) => {
  const context = await getContext(ctx)

  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context }),
    cache: new InMemoryCache()
  })
}


export default initApolloSchemaClient
