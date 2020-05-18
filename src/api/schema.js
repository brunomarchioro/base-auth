import { makeExecutableSchema } from "apollo-server-micro"
import { resolvers } from "./resolvers"
import { typeDefs } from "./type-defs"

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default schema
