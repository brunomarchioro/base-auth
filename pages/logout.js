import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useAuth } from "../lib/contexts/AuthContext"

const LogoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`

function Logout() {
  const client = useApolloClient()
  const router = useRouter()
  const [logout] = useMutation(LogoutMutation)
  const { clearAuthData } = useAuth()

  React.useEffect(() => {
    logout().then(() => {
      client.resetStore().then(() => {
        clearAuthData()
        router.push('/login')
      })
    })
  }, [logout, router, client])

  return <p>logout...</p>
}

export default Logout
