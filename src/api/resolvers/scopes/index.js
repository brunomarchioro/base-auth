import findScopes from "./findScopes"
import getScope from "./getScope"

export default {
  Query: {
    scope: getScope,
    scopes: findScopes
  }
}
