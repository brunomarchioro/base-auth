import { sql } from "slonik"
import db from "api/connectors/pgsql"

export default async (username) => {
  return await db.maybeOne(sql`SELECT * FROM users WHERE username = ${username}`)
}
