import createPost from "api/models/posts/createPost"
import { requireAuth } from "lib/api/auth"
import { createPostSchema } from "lib/validation/posts"
import validate from "lib/validation/validate"

export default async (_parent, { input }, { auth }) => {
  requireAuth(auth)

  const data = await validate(createPostSchema, input)

  console.log(data)

  const post = await createPost(data)

  return { post }
}
