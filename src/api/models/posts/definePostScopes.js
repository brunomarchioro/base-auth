import { sql } from "slonik"

export default async ({ postId, scopeIds }, db) => {
  try {
    const results = await Promise.all(scopeIds.map(scopeId => {
      return db.one(sql`
        INSERT INTO posts_x_scopes
          (post_id, scope_id)
        VALUES 
          (${postId}, ${scopeId})
      `)
    }))
    console.log(results)
    return results
  } catch (e) {
    console.error(e)
  }
}
