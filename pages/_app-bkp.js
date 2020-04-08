import React from "react"
import { AuthProvider } from "../lib/contexts/AuthContext"

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
