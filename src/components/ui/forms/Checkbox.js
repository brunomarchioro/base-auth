import PropTypes from "prop-types";
import React, { useState, Fragment } from "react"
import { Controller } from "react-hook-form";
import pull from "lodash/pull"

const getInitialInputValue = (selected = []) => {
  const others = selected.find(i => i.includes('Outros:'))
  if (others) {
    return others.replace('Outros:', '')
  }
  return ""
}

const CheckboxInput = ({ options, ...props }) => {
  const [inputValue, setInputValue] = useState(getInitialInputValue(props.value));
  const [otherChecked, setOtherChecked] = useState(false);
  const [selected, setSelected] = useState(props.value || []);

  const isOther = option => {
    option = option.toLowerCase();
    return (
      option === "outro" ||
      option === "outra" ||
      option === "outros" ||
      option === "outras" ||
      option === "quais"
    );
  };

  const handleOption = (option, checked) => {
    let selectedOptions = selected

    if (checked) {
      selectedOptions.push(option)
    } else {
      selectedOptions = pull(selectedOptions, option)
    }

    setSelected([...selectedOptions])
    props.onChange(selectedOptions)
  };

  const handleOthersOption = (option, checked = true) => {
    let selectedOptions = selected
    const optionIndex = selectedOptions.findIndex(i => i.toLowerCase().includes('outro', 'outra', 'quais'))
    if (optionIndex === -1) {
      selectedOptions.push(`Outros:${option}`)
    } else {
      if (checked) {
        selectedOptions[optionIndex] = `Outros:${option}`
      } else {
        selectedOptions.splice(optionIndex, 1)
      }
    }
    setInputValue(option)
    setOtherChecked(checked)
    setSelected([...selectedOptions])
    props.onChange(selectedOptions)
  }

  return (
    <Fragment>
      {options.map((option, index) => (
        <div key={index} className="w-full flex items-baseline">
          {!isOther(option) ? (
            <>
              <input
                id={props.name + "-" + index}
                type="checkbox"
                checked={selected.find(i => i === option)}
                onChange={e => {
                  handleOption(option, e.target.checked);
                }}
              />
              <label htmlFor={props.name + "-" + index} className="my-1 mx-2">
                {option}
              </label>
            </>
          ) : (
            <>
              <input
                id={props.name + "-" + index}
                type="checkbox"
                checked={otherChecked || selected.find(i => i.includes('Outros:'))}
                onChange={e => {
                  handleOthersOption('', e.target.checked);
                }}
              />
              <label htmlFor={props.name + "-" + index} className="my-1 mx-2">
                {option}
              </label>
              <input
                type="text"
                maxLength="200"
                className="flex-grow my-1 shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                value={inputValue}
                onChange={e => {
                  handleOthersOption(e.target.value, true);
                }}
                onClick={() => {
                  setOtherChecked(true);
                }}
              />
            </>
          )}
        </div>
      ))}
    </Fragment>
  )
};

CheckboxInput.propTypes = {
  options: PropTypes.array,
  value: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func
};

export const Checkbox = ({ question, ...props }) => (
  <Controller
    {...props}
    as={CheckboxInput}
    name={question.name}
    rules={{ required: question.parameters.required }}
    options={question.parameters.options}
  />
);

Checkbox.propTypes = {
  question: PropTypes.object
};
