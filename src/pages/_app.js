import { ApolloProvider } from "@apollo/react-common"
import { useRouter } from "next/router"
import React, { Fragment } from "react"
import Head from "next/head"
import { initApolloClient } from "../api/client"
import AdminLayout from "../components/layout/AdminLayout"
import SiteLayout from "../components/layout/SiteLayout"
import { AuthProvider } from "../lib/contexts/AuthContext"

function App({ Component, pageProps }) {
  const router = useRouter()
  const apolloClient = initApolloClient()
  const Layout = Component.Layout || SiteLayout

  return (
    <Fragment>
      <Head>
        <title>Base app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

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
    </Fragment>
  )
}

export default App
