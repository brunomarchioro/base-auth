import React, { Fragment } from "react"
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useForm } from "react-hook-form"
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { useRouter } from 'next/router'

const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
    }
  }
`

function Login() {
  const client = useApolloClient()
  const router = useRouter()
  const [login, { error: submitError }] = useMutation(loginMutation)
  const { register, errors, ...methods } = useForm()

  const handleSubmit = async ({ username = "", password = "" }) => {
    try {
      await client.resetStore()
      const { data } = await login({
        variables: {
          username,
          password
        }
      })
      if (data.login.id) {
        await router.push('/')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Fragment>
      <h1>Login</h1>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>

        {submitError && (
          <p>login error!</p>
        )}

        <div>
          <label htmlFor="username">username</label>
          <input
            name="username"
            ref={register({ required: true })}
          />
          {errors.username && (
            <p>{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input
            name="password"
            type="password"
            ref={register({ required: true })}
          />
          {errors.password && (
            <p>{errors.password.message}</p>
          )}
        </div>

        <button type="submit">login</button>
      </form>
    </Fragment>
  )
}

export default withApollo(Login)




