import AppFooter from "components/shared/AppFooter"
import Topbar from "components/shared/Topbar"
import { EnvRibbon } from "components/ui/Ribbon"
import React, { Fragment } from "react"
import usePrivateRoute from "lib/hooks/auth/usePrivateRoute"
import AdminHeader from "./AdminHeader"

const AdminLayout = ({ children }) => {
  const { user } = usePrivateRoute()

  if (!user) return null

  return (
    <Fragment>
      <div className="base-layout">
        <EnvRibbon/>

        <div className="w-full fixed z-50">
          <Topbar/>
        </div>

        <div className="main-wrapper mt-16">
          {children}
        </div>

        {/*language=CSS*/}
        <style jsx>{`
        .base-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-wrapper {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
      `}</style>
      </div>
    </Fragment>
  )
}

export default AdminLayout
