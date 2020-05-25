import updatePost from "api/models/posts/updatePost"
import { requireAuth } from "lib/api/auth"
import { updatePostSchema } from "lib/validation/posts"
import validate from "lib/validation/validate"

export default async (_parent, { input }, { auth }) => {
  requireAuth(auth)

  const data = await validate(updatePostSchema, input)
  const post = await updatePost(data)

  return { post }
}
