import SQL from "sql-template-strings"

export default async (_parent, { codename }, { db }) => {
  try {
    console.log("fetch scope", codename)
    if (!codename) {
      return db.get(SQL`SELECT * FROM scopes WHERE isDefault = 1`)
    }

    return db.get(SQL`SELECT * FROM scopes WHERE codename = ${codename}`)
  } catch (error) {
    console.error(error)
  }
}
