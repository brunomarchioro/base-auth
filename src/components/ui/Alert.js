import PropTypes from "prop-types"
import React from "react"

export const Alert = ({ message, className, ...props }) => {
  let variants = 'bg-gray-100 border-gray-400 text-gray-700'
  if (props.isDanger) variants = 'bg-red-100 border-red-400 text-red-700'
  if (props.isWarning) variants = 'bg-orange-100 border-orange-400 text-orange-700'

  return (
    <div className={`border px-4 py-3 rounded relative ${variants} ${className}`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  )
}

Alert.defaultProps = {
  className: ""
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  isDanger: PropTypes.bool,
  isWarning: PropTypes.bool,
  className: PropTypes.string
}
