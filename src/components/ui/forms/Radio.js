import PropTypes from "prop-types";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

const RadioInput = ({ options, ...props }) => {
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(props.value);

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

  return options.map((option, index) => (
    <div key={index} className="w-full flex items-baseline">
      <input
        {...props}
        className="my-1"
        id={props.name + "-" + index}
        type="radio"
        value={option}
        onChange={e => {
          setInputValue("");
          setChecked(e.target.value);
          props.onChange(e);
        }}
        checked={option === checked}
      />

      <label htmlFor={props.name + "-" + index} className="my-1 mx-2">
        {option}
      </label>

      {isOther(option) && (
        <input
          type="text"
          maxLength="200"
          className="flex-grow my-1 shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            props.onChange(e.target.value);
          }}
          onClick={() => {
            setChecked(option);
            props.onChange(option);
          }}
        />
      )}
    </div>
  ));
};

export const Radio = ({ question, ...props }) => (
  <Controller
    {...props}
    as={RadioInput}
    name={question.name}
    rules={{ required: question.parameters.required }}
    options={question.parameters.options}
  />
);

Radio.propTypes = {
  question: PropTypes.object
};
