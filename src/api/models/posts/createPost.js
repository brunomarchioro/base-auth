import { sql } from "slonik"

export default async ({ title, content }, db) => {
  return await db.one(sql`
    INSERT INTO posts
      (title, content)
    VALUES 
      (${title}, ${content})
    RETURNING *
  `)
}
