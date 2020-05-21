import React, { Fragment } from "react"
import SiteHeader from "./SiteHeader"

const SiteLayout = ({ children }) => (
  <Fragment>
    <SiteHeader/>

    <main>
      {children}
    </main>
  </Fragment>
)

export default SiteLayout
