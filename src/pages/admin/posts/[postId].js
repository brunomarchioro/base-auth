import { useMutation, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useRouter } from "next/router"
import React from "react"
import PostForm from "../../../components/posts/PostForm"

const postQuery = gql`
  query post($postId: ID!) {
    post(postId: $postId) {
      postId
      title
      body
    }
  }
`

const updatePostMutation = gql`
  mutation updatePost($postId: ID!, $title: String!, $body: String) {
    updatePost(postId: $postId, title: $title, body: $body) {
      postId
    }
  }
`

const AdminPostsShowPage = () => {
  const router = useRouter()
  const { postId } = router.query

  const { loading, data } = useQuery(postQuery, {
    variables: { postId },
    skip: !postId
  })

  const [updatePost, { error: submitError }] = useMutation(updatePostMutation)

  const handleSubmit = async (values) => {
    try {
      const { data } = await updatePost({
        variables: {
          postId,
          ...values
        }
      })
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  if (loading) return "Loading..."

  return (
    <div>
      <h1>Post</h1>

      {submitError && (
        <p>save error!</p>
      )}

      <PostForm defaultValues={data.post} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default AdminPostsShowPage
