import PropTypes from "prop-types"
import React from "react"
import clsx from "clsx"

export const Card = ({ title, className, children, ...props }) => {
  const classNames = clsx(
    "p-8", "mb-4", "bg-white", "rounded-md", "shadow-md", className
  )
  const titleClassNames = clsx('text-lg', 'font-semibold', 'mb-2')

  return (
    <div {...props} className={classNames}>
      <div className={titleClassNames}>{title}</div>
      {children}
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export const CardList = ({ className, children, ...props }) => {
  const classNames = clsx("list-disc", "list-inside", className)

  return (
    <ul {...props} className={classNames}>
      {children}
    </ul>
  )
}

CardList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
