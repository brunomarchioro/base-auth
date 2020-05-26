import findPosts from "api/models/posts/findPosts"
import getPostById from "api/models/posts/getPostById"
import findViewerGroups from "api/models/viewer/findViewerGroups"
import findViewerPermissions from "api/models/viewer/findViewerPermissions"
import getViewer from "api/models/viewer/getViewer"
import { requireAuth } from "lib/api/auth"

export default {
  Viewer: {
    fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,

    groups: async ({ userId }, _args, { auth }) => {
      requireAuth(auth)
      return findViewerGroups(userId)
    },

    permissions: async ({ userId }, _args, { auth }) => {
      requireAuth(auth)
      return findViewerPermissions(userId)
    },

    post: async (_parent, { postId }, { auth }) => {
      requireAuth(auth)
      return getPostById(postId)
    },

    posts: async ({ userId }, _args, { auth }) => {
      requireAuth(auth)
      return findPosts()
    }
  },

  Query: {
    viewer: async (_parent, _args, { auth }) => {
      requireAuth(auth)
      return getViewer({ auth })
    }
  }
}
