import { useQuery } from "@apollo/react-hooks"
import { ErrorMessage, Field, Form, Formik, useField } from "formik"
import gql from "graphql-tag"
import { createPostSchema, updatePostSchema } from "lib/validation/posts"
import React from "react"
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

const ScopesInput = (props) => {
  const [field, meta, helpers] = useField(props.name)
  const { loading, data } = useQuery(scopesQuery)

  if (loading || !data) return "Loading..."

  console.log(data)
  return (
    <select {...field} {...props}>
      {data?.scopes?.entries.map(scope => (
        <option value={scope.scopeId}>{scope.name}</option>
      ))}
    </select>
  )
}

const getInitialValues = (initialValues) => {
  const defaultValues = {
    scopes: [],
    title: '',
    content: ''
  }

  console.log({ ...defaultValues, ...initialValues })

  return { ...defaultValues, ...initialValues }
}

const PostForm = ({ initialValues, handleSubmit }) => {
  return (
    <Formik
      initialValues={getInitialValues(initialValues)}
      validationSchema={initialValues ? updatePostSchema : createPostSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await handleSubmit(values)
        setSubmitting(false)
      }}
    >
      {({ isSubmitting, setValues }) => (
        <Form>
          <Field type="text" name="title"/>
          <ErrorMessage name="title" component="div"/>

          <ScopesInput name="scopes"/>

          <Field as="textarea" name="content"/>
          <ErrorMessage name="content" component="div"/>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>

          <button onClick={() => {
            const title = faker.lorem.words()
            setValues({
              title: title.charAt(0).toUpperCase() + title.slice(1),
              content: [faker.lorem.text(), faker.lorem.text(), faker.lorem.text()].join("\n")
            })
          }}>random
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default PostForm
