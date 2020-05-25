import findScopePosts from "../../models/posts/findScopePosts"

export default async ({ codename }, _args, ctx) => {
  try {
    return findScopePosts({ codename }, ctx)
  } catch (error) {
    console.error(error)
  }
}
