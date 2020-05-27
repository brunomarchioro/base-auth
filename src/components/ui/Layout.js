import React from "react"
import PropTypes from "prop-types"

export const Container = ({ className, children, ...props }) => (
  <div className={`container mx-auto px-2 md:px-4 ${className}`} {...props}>
    {children}
  </div>
)

Container.defaultProps = {
  className: ""
}

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export const ContentWithSidebar = ({ sidebar, children }) => (
  <Container>
    <div className={`flex flex-wrap mt-8 -mx-4`}>
      <div className="w-full md:w-2/3 px-4">{children}</div>
      <div className="hidden md:block md:w-1/3 px-4">{sidebar}</div>
    </div>
  </Container>
)

ContentWithSidebar.propTypes = {
  sidebar: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired
}

export const ContentSingleCol = ({ children }) => (
  <Container>
    <div className="mt-8">
      {children}
    </div>
  </Container>
)

ContentSingleCol.propTypes = {
  children: PropTypes.node.isRequired
}
