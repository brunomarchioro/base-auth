import React from "react";
import PropTypes from "prop-types"
import Link from "next/link";
import { useRouter } from "next/router";

const ActiveLink = ({ children, activeClassName = 'is-active', ...props }) => {
  const router = useRouter()
  const child = React.Children.only(children)

  let className = child.props.className || '';
  if (router.pathname === props.href || `/${router.pathname.split("/")[1]}` === props.href) {
    className = `${className} ${activeClassName}`.trim();
  }

  return (
    <Link {...props}>
      {React.cloneElement(child, { className })}
    </Link>
  )
}

ActiveLink.propTypes = {
  children: PropTypes.element.isRequired,
  activeClassName: PropTypes.string,
  href: PropTypes.string,
}

export default ActiveLink
