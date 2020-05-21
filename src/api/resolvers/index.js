import merge from "lodash/merge"
import fs from "fs"

const root = {}

const resolvers = fs.readdirSync("src/api/resolvers")
  .filter(file => !file.includes('.js'))
  .map(file => require(`./${file}`).default)

export default merge(
  root, ...resolvers
)
