import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import Router from "next/router"
import { Container } from "components/ui"
import { useApp } from "lib/contexts/AppContext"
import TopbarMenu from "./TopbarMenu"

const Topbar = () => {
  const { topbarCollapsed, setTopbarCollapsed, toggleTopbar, isMobile, isHome } = useApp()
  const topbarRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (topbarRef.current && !topbarRef.current.contains(event.target)) {
        setTopbarCollapsed(true)
      }
    }

    function handleRouteChange() {
      setTopbarCollapsed(true)
    }

    document.addEventListener("click", handleClickOutside)
    Router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      document.removeEventListener("click", handleClickOutside)
      // Verificar por que ao remover o listener aqui ele deixa de funcionar.
      // Router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [])

  const navStyle = {
    backgroundColor: "#00693e",
    background: "linear-gradient(326deg, rgba(0, 105, 62, 1) 18%, rgba(42, 145, 103, 1) 51%, rgba(0, 105, 62, 1) 79%)",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.3)"
  }

  const shadowStyle = {
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.3)"
  }

  const MobileBar = {
    display: "none"
  }

  return (
    <div ref={topbarRef} className="z-50">
      <nav className="flex h-16 z-50" style={navStyle}>
        <Container className="flex justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a>
                <img className="h-8 lg:h-10" src={"/logo.png"} alt="Logo"/>
              </a>
            </Link>
          </div>

          {!isMobile && (
            <div className="hidden lg:flex">
              <TopbarMenu/>
            </div>
          )}

          {isMobile && (
            <div className="flex lg:hidden text-white">
              <button
                className="last:mr-0 rounded text-white text-center my-1 py-2 px-4 hover:bg-gray-700 items-center inline-flex focus:outline-none"
                onClick={() => toggleTopbar()}
                aria-label="menu"
              >
                <FontAwesomeIcon icon={faBars}/>
              </button>
            </div>
          )}
        </Container>
      </nav>
      {isMobile && !topbarCollapsed && (
        <nav className="flex lg:hidden bg-gray-500 absolute w-full z-50" style={shadowStyle}>
          <Container>
            <TopbarMenu/>
          </Container>
        </nav>
      )}
    </div>
  )
}

Topbar.propTypes = {
  isHome: PropTypes.bool
}

export default Topbar
