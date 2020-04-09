import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React from "react"
import { useForm } from "react-hook-form"
import usePrivateRoute from "../../lib/hooks/auth/usePrivateRoute"

const createPostMutation = gql`
  mutation createPost($title: String!, $body: String) {
    createPost(title: $title, body: $body) {
      id
      title
      body
    }
  }
`

function PostListPage() {
  usePrivateRoute()
  const [createPost, { error: submitError }] = useMutation(createPostMutation);

  const { register, errors, ...methods } = useForm()

  const handleSubmit = async (values) => {
    try {
      await createPost({
        variables: values
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1>new post</h1>

      <form onSubmit={methods.handleSubmit(handleSubmit)}>

        {submitError && (
          <p>save error!</p>
        )}

        <div>
          <label htmlFor="title">title</label>
          <input
            name="title"
            ref={register({ required: true })}
          />
          {errors.title && (
            <p>{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="body">body</label>
          <textarea
            name="password"
            ref={register}
          />
          {errors.body && (
            <p>{errors.body.message}</p>
          )}
        </div>

        <button type="submit">send</button>
      </form>
    </div>
  )
}

export default PostListPage
