import { sql } from "slonik"
import { raw } from "slonik-sql-tag-raw"
import db from "api/connectors/pgsql"
import snakeCaseKeys from "snakecase-keys"

export default async ({ id, ...input }) => {
  const fields = Object.entries(snakeCaseKeys(input)).map(([key, value]) => {
    return `${key} = '${value}'`
  }).join(", ")

  return db.one(sql` 
    UPDATE
      posts
    SET
      ${raw(fields)}
    WHERE
      id = ${id}
    RETURNING *
  `)
}
