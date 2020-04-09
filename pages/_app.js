import { ApolloProvider } from "@apollo/react-common"
import React from "react"
import { initApolloClient } from "../apollo/client"
import Layout from "../components/layouts/Layout"
import { AuthProvider } from "../lib/contexts/AuthContext"

function App({ Component, pageProps }) {
  const apolloClient = initApolloClient()
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
