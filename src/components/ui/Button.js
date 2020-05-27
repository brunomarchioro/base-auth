import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
import React from "react"

export const ButtonGroup = ({ children }) => {
  return (
    <div className="inline-flex">
      {React.Children.map(children, child =>
        React.cloneElement(child, { isChild: true, className: "first:rounded-l last:rounded-r" })
      )}
    </div>
  )
}

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired
}

export const Button = ({ isDanger, isWarning, isHover, isLoading, isChild, children, className, ...props }) => {
  let variants = "bg-green-700 hover:bg-green-900"
  if (isDanger) variants = "bg-red-500 hover:bg-red-700"
  if (isWarning) variants = "bg-orange-500 hover:bg-orange-700"
  if (isHover) variants = "bg-blue-700 hover:bg-blue-700"
  if (!isChild) variants += " rounded mr-4 last:mr-0"

  return (
    <button
      className={`py-4 px-6 text-white font-bold ${variants} ${className}`}
      {...props}
    >
      {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} spin/>
        ) :
        children
      }
    </button>
  )
}

Button.defaultProps = {
  className: '',
  isLoading: false,
  isChild: false
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  isDanger: PropTypes.bool,
  isWarning: PropTypes.bool,
  isHover: PropTypes.bool,
  isLoading: PropTypes.bool,
  isChild: PropTypes.bool,
  className: PropTypes.string
}
