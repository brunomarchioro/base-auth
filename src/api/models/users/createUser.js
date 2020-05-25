import { sql } from "slonik"
import crypto from 'crypto'
import db from "api/connectors/pgsql"

export default async ({ username, password, firstName, lastName, email }) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

  return db.any(sql`
    INSERT INTO 
      users (username, first_name, last_name, email, salt, hash) 
    VALUES 
      (${username}, ${firstName}, ${lastName}, ${email}, ${salt}, ${hash})
    RETURNING *
  `)
}
