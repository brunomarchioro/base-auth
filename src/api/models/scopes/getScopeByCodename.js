import { sql } from "slonik"
import db from "api/connectors/pgsql"

export default async (codename) => {
  return db.one(sql`SELECT * FROM scopes WHERE codename = ${codename}`)
}
