import { useMutation, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useRouter } from "next/router"
import React from "react"
import PostForm from "../../../components/posts/PostForm"

const postQuery = gql`
  query post($id: Int!) {
    post(id: $id) {
      id
      title
      content
    }
  }
`

const updatePostMutation = gql`
  mutation updatePost($id: Int!, $title: String!, $content: String) {
    updatePost(id: $id, title: $title, content: $content) {
      id
    }
  }
`

const AdminPostsShowPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { loading, data } = useQuery(postQuery, {
    variables: { id: parseInt(id, 10) },
    skip: !id
  })

  const [updatePost, { error: submitError }] = useMutation(updatePostMutation)

  const handleSubmit = async (values) => {
    try {
      const { data } = await updatePost({
        variables: {
          id: parseInt(id, 10),
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
