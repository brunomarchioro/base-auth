import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Router, { useRouter } from 'next/router'

const AppContext = React.createContext()

function AppProvider(props) {
  const router = useRouter()
  const [topbarCollapsed, setTopbarCollapsed] = useState(true)
  const [topBanner, setTopBanner] = useState(null)
  const [isMobile, setIsMobile] = useState(props.deviceType !== 'desktop')
  const [isHome, setIsHome] = useState(router.pathname === "/")

  const toggleTopbar = () => {
    setTopbarCollapsed(!topbarCollapsed)
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return false;
    } else {
      handleResize()
    }

    function handleResize() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setIsMobile(false)
      } else {
        setIsMobile(true)
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleRouteChange(url) {
      setIsHome(url === "/")
    }

    Router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      // Verificar por que ao remover o listener aqui ele deixa de funcionar.
      // Router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        topBanner, setTopBanner, topbarCollapsed, setTopbarCollapsed, toggleTopbar, isMobile, isHome, setIsHome
      }}
      {...props}
    />
  )
}

AppProvider.defaultProps = {
  deviceType: 'desktop'
}

AppProvider.propTypes = {
  deviceType: PropTypes.string
}

function useApp() {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error(`useApp must be used within a AppProvider`)
  }
  return context
}

export { AppProvider, useApp }
