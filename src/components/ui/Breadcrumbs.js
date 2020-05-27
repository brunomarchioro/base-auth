import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import PropTypes from "prop-types"
import React, { Fragment } from "react"

const BreadcrumbsItem = ({ href, as, icon, title }) => {
  if (href) {
    return (
      <li>
        <Link href={href} as={as || href}>
          <a className="whitespace-no-wrap">
            {icon && <FontAwesomeIcon icon={icon} className="mr-2"/>}
            <span>{title}</span>
          </a>
        </Link>
      </li>
    )
  }

  return (
    <li className="overflow-hidden whitespace-no-wrap truncate">
      {icon && <FontAwesomeIcon icon={icon} className="mr-2"/>}
      <span>{title}</span>
    </li>
  )
}

BreadcrumbsItem.propTypes = {
  href: PropTypes.string,
  as: PropTypes.string,
  icon: PropTypes.any,
  title: PropTypes.string
}

export const Breadcrumbs = ({ items, className }) => {
  let variants = ""

  return (
    <ul className={`flex mb-4 ${variants} ${className}`}>
      {items.map((item, idx) => (
        <Fragment key={idx}>
          <BreadcrumbsItem {...item} />
          {items[idx + 1] ? <span className="mx-2">/</span> : null}
        </Fragment>
      ))}
    </ul>
  )
}

Breadcrumbs.defaultProps = {
  className: ""
}

Breadcrumbs.propTypes = {
  items: PropTypes.array.isRequired,
  className: PropTypes.string
}
