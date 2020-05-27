import { faInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
import React from "react"
import { Container } from "./"

export const Banner = ({ className, text }) => (
  <div className={`bg-yellow-500 text-white text-sm font-bold px-8 py-4 ${className}`} role="alert">
    <Container>
      <div className="flex items-center h-8">
        <FontAwesomeIcon icon={faInfo}/>
        <p className="ml-2">{text}</p>
      </div>
    </Container>
  </div>
)

Banner.defaultProps = {
  className: ""
}

Banner.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
}
