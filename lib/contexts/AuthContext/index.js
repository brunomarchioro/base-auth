import { useApolloClient } from "@apollo/react-hooks"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"

const AuthContext = React.createContext()

const unauthenticatedData = { isAuthenticated: false, user: null }

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`

function AuthProvider(props) {
  const client = useApolloClient();
  const [authData, setAuthData] = useState(unauthenticatedData)
  const [redirect, setRedirect] = useState(null)

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const { data } = await client.query({ query: ViewerQuery })
        setAuthData(data.viewer)
      } catch (e) {
        console.log(e)
      }
    }

    fetchAuthData()
  }, [])

  const login = authData => {
    setAuthData(authData)
  }

  const logout = () => {
    setAuthData(unauthenticatedData)
  }

  const redirectTo = path => {
    setRedirect(path)
  }

  return <AuthContext.Provider value={{ authData, login, logout, redirect, redirectTo }} {...props} />
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
