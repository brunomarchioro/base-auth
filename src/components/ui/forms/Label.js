import PropTypes from "prop-types"
import React from "react"

export const Label = ({ className, children, ...props }) => (
  <label
    className={`block text-gray-700 text-sm font-bold mb-2 text-base${className}`}
    {...props}
  >
    {children}
  </label>
)

Label.defaultProps = {
  className: ""
}

Label.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
