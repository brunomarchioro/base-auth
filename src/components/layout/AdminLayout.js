import React, { Fragment } from "react"
import Head from "next/head"
import usePrivateRoute from "../../lib/hooks/auth/usePrivateRoute"
import AdminHeader from "./AdminHeader"

const AdminLayout = ({ children }) => {
  const { user } = usePrivateRoute()

  if (!user) return null

  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="https://igoradamenko.github.io/awsm.css/css/awsm_theme_big-stone.min.css"/>
      </Head>

      <AdminHeader/>

      {children}
    </Fragment>
  )
}

export default AdminLayout
