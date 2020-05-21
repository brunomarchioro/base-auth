import React, { Fragment } from "react"
import usePrivateRoute from "../../lib/hooks/auth/usePrivateRoute"
import AdminHeader from "./AdminHeader"

const AdminLayout = ({ children }) => {
  const { user } = usePrivateRoute()

  if (!user) return null

  return (
    <Fragment>
      <AdminHeader/>

      <main>
        {children}
      </main>
    </Fragment>
  )
}

export default AdminLayout
