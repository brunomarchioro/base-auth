import PropTypes from "prop-types"
import React from "react"

export const Textarea = ({ inputRef, className, ...props }) => (
  <textarea
    id={props.name}
    ref={inputRef}
    maxLength="999"
    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
    {...props}
  />
)

Textarea.defaultProps = {
  className: ""
}

Textarea.propTypes = {
  className: PropTypes.string
}
