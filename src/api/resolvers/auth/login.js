import { UserInputError } from "apollo-server-micro"
import SQL from "sql-template-strings"
import findPermissions from "../../models/auth/findPermissions"

export default async function login(root, { username, password }, { auth, db }) {
  const { password: userPassword, ...user } = await db.get(SQL`SELECT * FROM users WHERE uuid = ${username}`)

  if (password === userPassword) {
    const permissions = findPermissions(user, db)
    await auth.set({ ...user, permissions })
    return user
  }

  throw new UserInputError("Invalid email and password combination")
}
