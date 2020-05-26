import { sql } from "slonik"
import db from "api/connectors/pgsql"

export default async () => {
  return db.one(sql`SELECT * FROM scopes WHERE is_default = TRUE`)
}
