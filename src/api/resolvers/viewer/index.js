import findViewerPosts from "api/resolvers/viewer/findViewerPosts"
import getViewerPost from "api/resolvers/viewer/getViewerPost"
import findViewerGroups from "./findViewerGroups"
import findViewerPermissions from "./findViewerPermissions"
import getViewer from "./getViewer"

export default {
  Viewer: {
    fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    groups: findViewerGroups,
    permissions: findViewerPermissions,
    post: getViewerPost,
    posts: findViewerPosts
  },

  Query: {
    viewer: getViewer
  }
}
