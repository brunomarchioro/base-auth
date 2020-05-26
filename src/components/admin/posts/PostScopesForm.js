import { useQuery } from "@apollo/react-hooks"
import { ErrorMessage, Field, Form, Formik } from "formik"
import gql from "graphql-tag"
import React from "react"

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

const PostScopesForm = () => {
  const { loading, data } = useQuery(scopesQuery)

  if (loading || !data) return "Loading..."

  console.log(data)

  return (
    <Formik
      initialValues={{ scope: 1 }}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values)
        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field as="select" name="scope">
            {data?.scopes?.entries.map(scope => (
              <option value={scope.scopeId}>{scope.name}</option>
            ))}
          </Field>
          <ErrorMessage name="scope" component="div"/>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default PostScopesForm
