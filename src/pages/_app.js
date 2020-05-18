import { ApolloProvider } from "@apollo/react-common"
import { useRouter } from "next/router"
import React from "react"
import { initApolloClient } from "../api/client"
import AdminLayout from "../components/layout/AdminLayout"
import SiteLayout from "../components/layout/SiteLayout"
import { AuthProvider } from "../lib/contexts/AuthContext"

function App({ Component, pageProps }) {
  const router = useRouter()
  const apolloClient = initApolloClient()
  const Layout = Component.Layout || SiteLayout

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        {router.pathname.startsWith("/admin") ? (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
