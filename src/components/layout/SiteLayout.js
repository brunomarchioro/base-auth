import React, { Fragment } from "react"
import Head from 'next/head'
import SiteHeader from "./SiteHeader"
import SiteMenu from "./SiteMenu"

const SiteLayout = ({ children }) => (
  <Fragment>
    <Head>
      <link rel="stylesheet" href="https://igoradamenko.github.io/awsm.css/css/awsm_theme_mischka.min.css"/>
    </Head>

    <SiteHeader/>
    <SiteMenu/>

    {children}
  </Fragment>
)

export default SiteLayout
