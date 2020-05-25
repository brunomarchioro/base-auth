import { Client } from "ldapts"

export default function connect() {
  const client = new Client({
    url: process.env.AUTH_LDAP_HOST
  })

  return client
}
