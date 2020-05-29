import { sql } from "slonik"
import { raw } from "slonik-sql-tag-raw"
import snakeCaseKeys from "snakecase-keys"

export default async ({ postId, ...input }, db) => {
  const fields = Object.entries(snakeCaseKeys(input)).map(([key, value]) => {
    return `${key} = '${value}'`
  }).filter(i => i).join(", ")

  return db.one(sql` 
    UPDATE
      posts
    SET
      ${raw(fields)}
    WHERE
      post_id = ${postId}
    RETURNING *
  `)
}
