import { GraphQLDate, GraphQLDateTime, GraphQLTime } from "graphql-iso-date"
import { GraphQLJSON } from "graphql-type-json"
import merge from "lodash/merge"
import fs from "fs"

const root = {
  JSON: GraphQLJSON,
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
}

const resolvers = fs.readdirSync("src/api/resolvers")
  .filter(file => file !== 'index.js')
  .map(file => require(`./${file}`).default)

export default merge(
  root, ...resolvers
)
