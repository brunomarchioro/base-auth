import findPosts from "api/models/posts/findPosts"
import getPostById from "api/models/posts/getPostById"
import getDefaultScope from "api/models/scopes/getDefaultScope"
import getScopeByCodename from "api/models/scopes/getScopeByCodename"

export default {
  Scope: {
    post: async (_parent, { id }, { db }) => {
      try {
        return getPostById(id)
      } catch (error) {
        console.error(error)
      }
    },

    posts: async ({ codename }, _args, ctx) => {
      try {
        const options = {
          filters: {
            scope: codename
          }
        }
        return findPosts(options)
      } catch (error) {
        console.error(error)
      }
    }
  },

  Query: {
    scope: async (_parent, { codename }) => {
      try {
        if (!codename) {
          return getDefaultScope()
        }

        return getScopeByCodename(codename)
      } catch (error) {
        console.error(error)
      }
    },

    scopes: async (_parent, _args) => {
      try {
        return []
      } catch (error) {
        console.error(error)
      }
    }
  }
}
