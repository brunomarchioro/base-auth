import crypto from "crypto"
import { sql } from "slonik"
import { raw } from "slonik-sql-tag-raw"
import db from "api/connectors/pgsql"
import snakeCaseKeys from "snakecase-keys"

export default async ({ id, ...input }) => {
  const fields = Object.entries(snakeCaseKeys(input)).map(([key, value]) => {
    if (key === "password") {
      const salt = crypto.randomBytes(16).toString('hex')
      const hash = crypto.pbkdf2Sync(value, salt, 1000, 64, 'sha512').toString('hex')

      return `salt = '${salt}', hash = '${hash}'`
    }
    return `${key} = '${value}'`
  }).join(", ")

  return db.one(sql` 
    UPDATE
      users
    SET
      ${raw(fields)}
    WHERE
      id = ${id}
    RETURNING *
  `)
}
