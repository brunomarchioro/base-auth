import { faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TopbarAuth from "components/shared/Topbar/TopbarAuth"
import React from "react"
import ActiveLink from "components/shared/ActiveLink"

const TopbarMenu = () => {
  return (
    <div className="flex flex-col lg:flex-row content-center items-center my-2 lg:my-0">
      <ActiveLink href={"/pesquisas"} as={"/pesquisas"}>
        <a className="last:mr-0 rounded text-white hover:text-white text-center w-full my-1 p-2 lg:mr-1 lg:last:mr-0 hover:bg-green-700 items-center inline-flex">
          <FontAwesomeIcon icon={faClipboardList}/>
          <span className="ml-1">Pesquisas</span>
        </a>
      </ActiveLink>

      <TopbarAuth/>
    </div>
  )
}

export default TopbarMenu
