import PropTypes from "prop-types"
import React from "react"

export const Ribbon = ({ className, text }) => (
  <div className={`ribbon bg-red-500 font-bold text-white text-center shadow-md ${className}`}>
    {text}

    {/*language=CSS*/}
    <style jsx>{`
      .ribbon {
        position: fixed;
        width: 200px;
        bottom: 35px;
        right: -45px;
        overflow: hidden;
        z-index: 60;
        line-height: 40px;
        transform: rotate(-45deg);
        transform-origin: center center;
      }
    `}</style>
  </div>
)

Ribbon.defaultProps = {
  className: ""
}

Ribbon.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
}

export const EnvRibbon = () => {
  if (process.env.APP_ENV === 'production') return null
  return <Ribbon text={process.env.APP_ENV === 'development' ? 'Desenvolvimento' : 'Homologação'} />
}
