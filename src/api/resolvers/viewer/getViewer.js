import { AuthenticationError } from "apollo-server-micro"
import db from "api/connectors/pgsql"
import { sql } from "slonik"

export default async (_parent, _args, { auth }) => {
  try {
    return db.one(sql`
      SELECT
        *
      FROM
        users
      WHERE
        id = ${auth.user.id}
  `)
  } catch (e) {
    console.log(e)
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    )
  }
}
