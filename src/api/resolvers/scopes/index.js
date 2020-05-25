import findPosts from "./findPosts"
import getPost from "./getPost"
import findScopes from "./findScopes"
import getScope from "./getScope"

export default {
  Scope: {
    post: getPost,
    posts: findPosts
  },

  Query: {
    scope: getScope,
    scopes: findScopes
  }
}
