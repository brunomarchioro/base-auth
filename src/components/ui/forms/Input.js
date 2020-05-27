import PropTypes from "prop-types"
import React from "react"

export const Input = ({ inputRef, className, ...props }) => (
  <input
    id={props.name}
    ref={inputRef}
    maxLength="999"
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white ${className}`}
    {...props}
  />
)

Input.defaultProps = {
  className: ""
}

Input.propTypes = {
  className: PropTypes.string
}
