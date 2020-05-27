import React from "react"
import PropTypes from 'prop-types'

export const Tag = ({ className, children, ...props }) => {
  const classNames = `inline-block text-xs px-2 py-1 rounded bg-gray-300 overflow-hidden mr-1 last:mr-0 ${className}`

  return (
    <div {...props} className={classNames}>{children}</div>
  )
}


Tag.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
