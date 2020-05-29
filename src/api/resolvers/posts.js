import createPost from "api/models/posts/createPost"
import definePostScopes from "api/models/posts/definePostScopes"
import updatePost from "api/models/posts/updatePost"
import { requireAuth } from "lib/api/auth"
import { createPostSchema, updatePostSchema } from "lib/validation/posts"
import validate from "lib/validation/validate"

export default {
  Post: {},

  Mutation: {
    createPost: async (_parent, { input }, { auth, db }) => {
      requireAuth(auth)

      const data = await validate(createPostSchema, input)
      const post = await createPost(data, db)
      await definePostScopes(input.scopeIds, db)

      return { post }
    },

    updatePost: async (_parent, { input }, { auth, db }) => {
      requireAuth(auth)

      const { scopeIds, ...data } = await validate(updatePostSchema, input)
      const post = await updatePost(data, db)
      await definePostScopes({ postId: data.postId, scopeIds }, db)

      return { post }
    }
  }
}
