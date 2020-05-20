import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React from "react"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/router'
import PostForm from "../../../components/posts/PostForm"

const createPostMutation = gql`
  mutation createPost($title: String!, $content: String) {
    createPost(title: $title, content: $content) {
      id
    }
  }
`

const AdminPostsNewPage = () => {
  const router = useRouter()
  const [createPost, { error: submitError }] = useMutation(createPostMutation);

  const { register, errors, ...methods } = useForm()

  const handleSubmit = async (values) => {
    try {
      const { data } = await createPost({
        variables: values
      })
      router.push('/admin/posts/[id]', `/admin/posts/${data.createPost.id}`)
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
