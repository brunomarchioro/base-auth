import { ApolloError } from "apollo-server-micro"
import intersection from "lodash/intersection"
import connect from "api/connectors/ldap"

const adminGroups = process.env.ADMIN_GROUPS.split(",").map(i => i.trim())

export default async (username) => {
  const client = connect()
  const searchDN = `ou=Groups,${process.env.AUTH_LDAP_BASE_DN}`

  try {
    const { searchEntries } = await client.search(searchDN, {
      scope: "sub",
      filter: `(memberUid=${username})`
    })

    await client.unbind()

    const LDAPUserGroups = searchEntries.map(entry => entry.cn)
    let userGroups = []

    if (intersection(adminGroups, LDAPUserGroups).length > 0) {
      userGroups.push("admin")
    }

    if (userGroups.length === 0) {
      return null
    }

    return userGroups
  } catch (error) {
    throw new ApolloError(`Usuário ou senha inválidos!`)
  } finally {
    await client.unbind()
  }
}
