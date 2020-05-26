import { ErrorMessage, Field, Form, Formik } from "formik"
import { createPostSchema, updatePostSchema } from "lib/validation/posts"
import React from "react"
import faker from "faker"

const PostForm = ({ defaultValues, handleSubmit }) => {
  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={defaultValues ? updatePostSchema : createPostSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await handleSubmit(values)
        setSubmitting(false)
      }}
    >
      {({ isSubmitting, setValues }) => (
        <Form>
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" />

          <Field as="textarea" name="content" />
          <ErrorMessage name="content" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>

          <button onClick={() => {
            const title = faker.lorem.words()
            setValues({
              title: title.charAt(0).toUpperCase() + title.slice(1),
              content: [faker.lorem.text(),faker.lorem.text(),faker.lorem.text()].join('\n')
            })
          }}>random</button>
        </Form>
      )}
    </Formik>
  )
}

export default PostForm
