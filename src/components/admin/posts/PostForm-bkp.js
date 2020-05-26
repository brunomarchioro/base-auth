import { createPostSchema, updatePostSchema } from "lib/validation/posts"
import React from "react"
import { useForm } from "react-hook-form"
import faker from "faker"

const PostForm = ({ defaultValues, handleSubmit }) => {
  const { register, errors, setValue, ...methods } = useForm({
    defaultValues,
    validationSchema: defaultValues ? updatePostSchema : createPostSchema
  })

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
      <button onClick={() => {
        const title = faker.lorem.words()
        setValue('title', title.charAt(0).toUpperCase() + title.slice(1))
        setValue('content', [faker.lorem.text(),faker.lorem.text(),faker.lorem.text()].join('\n'))
      }}>random</button>
    </form>
  )
}

export default PostForm
