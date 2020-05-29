import { sql } from "slonik"
import db from "api/connectors/pgsql"

export default async (postId) => {
  return db.one(sql`SELECT * FROM posts WHERE post_id = ${postId}`)
}
