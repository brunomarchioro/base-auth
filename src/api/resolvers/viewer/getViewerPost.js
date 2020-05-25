import getViewerPostById from "api/models/posts/getViewerPostById"
import { requireAuth } from "lib/api/auth"

export default async (_parent, { id }, { auth }) => {
  requireAuth(auth)
  return await getViewerPostById(id)
}
