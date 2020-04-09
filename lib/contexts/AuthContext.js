import { useApolloClient } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"

const AuthContext = React.createContext()

const initialData = { isAuthenticated: false, loading: true, user: {} }
const unauthenticatedData = { isAuthenticated: false, loading: false, user: {} }
const authenticatedData = (user) => ({ isAuthenticated: true, loading: false, user })

const authenticatedUserQuery = gql`
  {
    authenticatedUser {
      fullName
      email
    }
  }
`

function AuthProvider(props) {
  const client = useApolloClient();
  const [authData, setAuthData] = useState(initialData)
  const [redirect, setRedirect] = useState(null)

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const { data } = await client.query({ query: authenticatedUserQuery })
        console.log('fetchAuthData', data)
        if (data.authenticatedUser) {
          setAuthData(authenticatedData(data.authenticatedUser))
        }
      } catch (e) {
        console.log('Error fetching auth data')
        setAuthData(unauthenticatedData)
      }
    }

    fetchAuthData()
  }, [])

  const saveAuthData = user => {
    console.log('saveAuthData', user)
    setAuthData(authenticatedData(user))
  }

  const clearAuthData = () => {
    console.log('clearAuthData')
    setAuthData(unauthenticatedData)
  }

  const redirectTo = path => {
    setRedirect(path)
  }

  return <AuthContext.Provider value={{ ...authData, saveAuthData, clearAuthData, redirect, redirectTo }} {...props} />
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
