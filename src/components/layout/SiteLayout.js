import React, { Fragment } from "react"
import Head from 'next/head'
import SiteHeader from "./SiteHeader"
import SiteMenu from "./SiteMenu"

const SiteLayout = ({ children }) => (
  <Fragment>
    <Head>
      <title>base-auth</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
    </Head>

    <SiteHeader/>
    <SiteMenu/>

    {children}
  </Fragment>
)

export default SiteLayout
