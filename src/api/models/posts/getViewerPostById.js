import { sql } from "slonik"
import db from "api/connectors/pgsql"

export default async (id) => {
  return db.one(sql`SELECT * FROM posts WHERE id = ${id}`)
}
