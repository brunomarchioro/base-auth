import SQL from "sql-template-strings"

export default async function findScopes(_parent, _args, { db }) {
  try {
    console.log("fetch scope list")
    return db.all(SQL`SELECT * FROM scopes`)
  } catch (error) {
    console.error(error)
  }
}
