import { useMutation, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useRouter } from "next/router"
import React from "react"
import PostForm from "components/admin/posts/PostForm"

const postQuery = gql`
  query post($postId: Int!) {
    viewer {
      post(postId: $postId) {
        postId
        title
        content
      }
    }
  }
`

const updatePostMutation = gql`
  mutation updatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      post {
        postId
      }
    }
  }
`

const AdminPostsShowPage = () => {
  const router = useRouter()
  const { postId } = router.query

  const { loading, data } = useQuery(postQuery, {
    variables: { postId: parseInt(postId, 10) },
    skip: !postId
  })

  const [updatePost, { error: submitError }] = useMutation(updatePostMutation)

  const handleSubmit = async (values) => {
    try {
      const { data } = await updatePost({
        variables: {
          input: {
            postId: parseInt(postId, 10),
            ...values
          }
        }
      })
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  if (loading || !data) return "Loading..."

  const { __typename, ...post } = data.viewer.post

  return (
    <div>
      <h1>Post</h1>

      {submitError && (
        <p>save error!</p>
      )}

      <PostForm defaultValues={post} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default AdminPostsShowPage
