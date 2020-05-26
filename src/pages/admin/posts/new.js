import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React from "react"
import { useRouter } from 'next/router'
import PostForm from "components/admin/posts/PostForm"

const createPostMutation = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        postId
      }
    }
  }
`

const AdminPostsNewPage = () => {
  const router = useRouter()
  const [createPost, { error: submitError }] = useMutation(createPostMutation);

  const handleSubmit = async (values) => {
    try {
      console.log(values)
      const { data } = await createPost({
        variables: { input: values }
      })
      // router.push('/admin/posts/[postId]', `/admin/posts/${data.createPost.post.postId}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1>new post</h1>

      {submitError && (
        <p>save error!</p>
      )}

      <PostForm handleSubmit={handleSubmit} />
    </div>
  )
}

export default AdminPostsNewPage
