import React from "react"
import { useForm } from "react-hook-form"

const PostForm = ({ defaultValues, handleSubmit }) => {
  const { register, errors, ...methods } = useForm({ defaultValues })

  return (
    <form onSubmit={methods.handleSubmit(handleSubmit)}>
      <div>
        <label htmlFor="title">title</label>
        <input
          name="title"
          type="text"
          ref={register({ required: true })}
        />
        {errors.title && (
          <p>{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="content">content</label>
        <textarea
          name="content"
          ref={register}
        />
        {errors.content && (
          <p>{errors.content.message}</p>
        )}
      </div>

      <button type="submit">send</button>
    </form>
  )
}

export default PostForm
