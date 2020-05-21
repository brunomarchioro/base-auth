import { AuthenticationError } from "apollo-server-micro"
import SQL from "sql-template-strings"
import login from "./login"
import logout from "./logout"

export default {
  Mutation: {
    login, logout
  }
}
