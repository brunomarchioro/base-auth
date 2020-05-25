import connect from "api/connectors/ldap"

export default async ({ username, password }) => {
  const client = connect()
  const bindDN = `uid=${username},ou=People,${process.env.AUTH_LDAP_BASE_DN}`

  try {
    await client.bind(bindDN, password)
    return true
  } catch (error) {
    return false
  } finally {
    await client.unbind()
  }
}
