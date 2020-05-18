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
        <title>base-auth</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>

      <AdminHeader/>

      {children}
    </Fragment>
  )
}

export default AdminLayout
