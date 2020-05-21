import createPost from "./createPost"
import findPosts from "./findPosts"
import getPost from "./getPost"
import updatePost from "./updatePost"

export default {
  Query: {
    post: getPost,
    posts: findPosts
  },

  Mutation: {
    createPost, updatePost
  }
}
