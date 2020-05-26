import db from "api/connectors/pgsql"
import { AuthenticationError } from "apollo-server-micro"
import { sql } from "slonik"

export default async ({ auth }) => {
  try {
    return db.one(sql`
      SELECT
        *
      FROM
        users
      WHERE
        user_id = ${auth.user.userId}
  `)
  } catch (e) {
    console.log(e)
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    )
  }
}
