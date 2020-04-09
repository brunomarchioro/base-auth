import React, { Fragment } from "react"
import Head from 'next/head'
import AppHeader from "../AppHeader"
import AppMenu from "../AppMenu"

function Layout({ children }) {
  return (
    <Fragment>
      <Head>
        <title>base-auth</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <AppHeader/>
      <AppMenu/>

      {children}
    </Fragment>
  )
}

export default Layout
