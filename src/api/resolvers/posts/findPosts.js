import { getUserPosts } from "../../models/posts"

export default async function findPosts(_parent, _args, { auth, db }) {
  try {
    console.log("fetch post list")
    if (!auth?.user) return []
    return getUserPosts({ auth }, db)
  } catch (error) {
    console.error(error)
  }
}
