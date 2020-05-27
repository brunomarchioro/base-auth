import PropTypes from "prop-types"
import React from "react"

export const Select = ({ inputRef, className, options, ...props }) => {
  return (
    <div className={`inline-block relative w-64 ${className || ''}`}>
      <select
        id={props.name}
        ref={inputRef}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        {...props}
      >
        <option value=""/>
        {options.map((option, index) => {
          if (typeof option === 'object') {
            return (
              <option value={option.value} key={index}>{option.label}</option>
            )
          } else {
            return (
              <option value={option} key={index}>{option}</option>
            )
          }
        })}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  )
}

Select.defaultProps = {
  className: "",
  options: []
}

Select.propTypes = {
  className: PropTypes.string
}
