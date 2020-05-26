import createPost from "api/models/posts/createPost"
import updatePost from "api/models/posts/updatePost"
import { requireAuth } from "lib/api/auth"
import { createPostSchema, updatePostSchema } from "lib/validation/posts"
import validate from "lib/validation/validate"

export default {
  Post: {},

  Mutation: {
    createPost: async (_parent, { input }, { auth }) => {
      requireAuth(auth)

      const data = await validate(createPostSchema, input)
      const post = await createPost(data)

      return { post }
    },

    updatePost: async (_parent, { input }, { auth }) => {
      requireAuth(auth)

      const data = await validate(updatePostSchema, input)
      const post = await updatePost(data)

      return { post }
    }
  }
}
