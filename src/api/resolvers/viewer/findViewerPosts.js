import findViewerPosts from "../../models/posts/findViewerPosts"

export default async ({ userId }, _args, ctx) => {
  try {
    return findViewerPosts({ userId }, ctx)
  } catch (error) {
    console.error(error)
  }
}
