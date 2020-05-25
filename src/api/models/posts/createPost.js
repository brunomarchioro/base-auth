import { sql } from "slonik"
import db from "api/connectors/pgsql"

export default async ({ title, content }) => {
  return await db.one(sql`
    INSERT INTO posts
      (title, content)
    VALUES 
      (${title}, ${content})
    RETURNING *
  `)
}
