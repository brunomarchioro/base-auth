import { useQuery } from "@apollo/react-hooks"
import { Input, Textarea } from "components/ui"
import gql from "graphql-tag"
import { createPostSchema, updatePostSchema } from "lib/validation/posts"
import React from "react"
import { useForm } from "react-hook-form"
import faker from "faker"

const scopesQuery = gql`
  {
    scopes {
      entries {
        scopeId
        name
      }
    }
  }
`

const ScopesInput = ({ name, inputRef }) => {
  const { data } = useQuery(scopesQuery)

  return (
    <select name={name} ref={inputRef} multiple>
      {data?.scopes?.entries.map(scope => (
        <option key={scope.scopeId} value={scope.scopeId}>{scope.name}</option>
      ))}
    </select>
  )
}

const PostForm = ({ initialValues, onSubmit }) => {
  const { register, errors, setValue, handleSubmit } = useForm({
    defaultValues: initialValues,
    validationSchema: initialValues ? updatePostSchema : createPostSchema
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">title</label>
        <Input
          name="title"
          type="text"
          inputRef={register}
        />
        {errors.title && (
          <p>{errors.title.message}</p>
        )}
      </div>

      <ScopesInput name="scopeIds" inputRef={register}/>

      <div>
        <label htmlFor="content">content</label>
        <Textarea
          name="content"
          inputRef={register}
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
