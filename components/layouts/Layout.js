import React from "react"
import AppHeader from "../AppHeader"
import AppMenu from "../AppMenu"

function Layout({ children }) {
  return (
    <div>
      <AppHeader/>
      <AppMenu/>

      {children}
    </div>
  )
}

export default Layout
