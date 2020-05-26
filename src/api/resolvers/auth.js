import bind from "api/models/auth/bind"
import getLdapUser from "api/models/auth/getLdapUser"
import getUserByUsername from "api/models/users/getUserByUsername"
import updateUser from "api/models/users/updateUser"
import { UserInputError } from "apollo-server-micro"
import crypto from "crypto"
import omit from "lodash/omit"

export default {
  Mutation: {
    login: async (_parent, { username, password }, { auth }) => {
      let user = await getUserByUsername(username)
      let authenticated = false

      if (!user) {
        throw new UserInputError("Usuário ou senha inválidos!")
      }

      if (await bind({ username, password })) {
        const userLdap = await getLdapUser(username)

        user = await updateUser({
          userId: user.userId,
          username: userLdap.uid,
          lastName: userLdap.sn,
          firstName: userLdap.givenName,
          email: userLdap.mail,
          password
        })

        authenticated = true
      } else {
        const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex")
        if (hash === user.hash) {
          authenticated = true
        }
      }

      if (authenticated) {
        const data = omit(user, ["salt", "hash"])
        await auth.set(data)
        console.log(`Usuário autenticado: ${JSON.stringify(data, null, 2)}`)
        return user
      }

      throw new UserInputError("Usuário ou senha inválidos!")
    },

    logout: async (_parent, _args, { auth }) => {
      auth.destroy()
      return true
    }
  }
}
