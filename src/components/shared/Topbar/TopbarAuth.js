import React, { useState, useRef } from "react"
import { faSignInAlt, faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ActiveLink from "../ActiveLink"
import { useAuth } from "lib/contexts/AuthContext"
import { useApp } from "lib/contexts/AppContext"

const TopbarAuth = () => {
  const { authData, logout } = useAuth()
  const { isMobile } = useApp()
  const [open, setOpen] = useState(false)
  const authRef = useRef(null)

  if (!authData?.isAuthenticated) {
    return (
      <ActiveLink href={"/login"} as={"/login"}>
        <a
          className="last:mr-0 rounded text-white hover:text-white text-center w-full my-1 p-2 hover:bg-green-700 items-center inline-flex">
          <FontAwesomeIcon icon={faSignInAlt}/>
          <span className="ml-1">Entrar</span>
        </a>
      </ActiveLink>
    )
  }

  return (
    <div className={`relative inline-block w-full`} ref={authRef}>
      <button
        className={`last:mr-0 rounded text-white text-center w-full my-1 p-2 items-center inline-flex hover:bg-green-700 focus:outline-none ${open ? "bg-green-700" : ""}`}
        onClick={() => setOpen(state => !state)}>
        <FontAwesomeIcon icon={faUserCircle}/>
        {isMobile && (<span className="ml-1">{authData.user.name}</span>)}
      </button>

      <div
        className={`absolute z-30 py-2 right-0 w-full lg:w-auto border border-gray-400 bg-gray-300 rounded shadow-lg ${open ? "block" : "hidden"}`}
      >
        <p className="whitespace-no-wrap py-1 px-4">{authData.user.name}</p>

        <button className="block w-full text-left py-1 px-4 hover:bg-gray-600 hover:text-white" onClick={(e) => {
          e.preventDefault()
          logout()
        }}>
          <FontAwesomeIcon icon={faSignOutAlt}/>
          <span className="ml-1">Sair</span>
        </button>
      </div>
    </div>
  )
}

export default TopbarAuth
