import { ApolloError } from "apollo-server-micro"
import connect from "api/connectors/ldap"

export default async (username) => {
  const client = connect()
  const searchDN = `ou=People,${process.env.AUTH_LDAP_BASE_DN}`

  try {
    const { searchEntries } = await client.search(searchDN, {
      scope: "sub",
      filter: `(uid=${username})`
    })

    await client.unbind()

    if (searchEntries.length === 0) {
      return null
    }

    return searchEntries[0]
  } catch (error) {
    throw new ApolloError(`Usuário ou senha inválidos!`)
  } finally {
    await client.unbind()
  }
}
