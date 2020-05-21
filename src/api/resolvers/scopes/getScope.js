import SQL from "sql-template-strings"

export default async function getScope(_parent, { codename }, { db }) {
  try {
    console.log("fetch scope", codename)
    return db.get(SQL`SELECT * FROM scopes WHERE codename = ${codename}`)
  } catch (error) {
    console.error(error)
  }
}
