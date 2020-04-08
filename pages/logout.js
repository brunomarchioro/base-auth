import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { withApollo } from '../apollo/client'

const LogoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`

function Logout() {
  const client = useApolloClient()
  const router = useRouter()
  const [logout] = useMutation(LogoutMutation)

  React.useEffect(() => {
    logout().then(() => {
      client.resetStore().then(() => {
        router.push('/login')
      })
    })
  }, [logout, router, client])

  return <p>logout...</p>
}

export default withApollo(Logout)
