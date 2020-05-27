import PropTypes from "prop-types"
import React from "react"

export const Box = ({ className, children }) => (
  <div className={`px-6 py-4 border border-gray-300 rounded overflow-hidden shadow-lg ${className}`}>
    {children}
  </div>
)

Box.defaultProps = {
  className: ""
}

Box.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
