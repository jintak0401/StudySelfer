import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const NumberInput = styled.TextInput`
  background-color: white;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  border: 1px solid black;
  width: 80%;
  opacity: ${(props) => (props.editable ? 1 : 0.2)};
`;

const Input = ({
  placeholder,
  onSubmit,
  defaultValue,
  setMoveActive,
  dontKnow,
}) => {
  const [input, setInput] = useState("");
  const inputNum = (text) => {
    setInput(text.replace(/[^0-9]/g, ""));
  };
  useEffect(() => {
    setInput(defaultValue ? `${defaultValue}` : "");
  }, [defaultValue]);
  return (
    <NumberInput
      editable={!dontKnow}
      placeholder={placeholder}
      returnKeyType={"done"}
      keyboardType="numeric"
      value={input}
      onChangeText={(text) => inputNum(text)}
      onSubmitEditing={() => onSubmit(Number(input))}
      onFocus={() => setMoveActive(false)}
      onEndEditing={() => {
        onSubmit(Number(input));
        setMoveActive(true);
      }}
      maxLength={3}
    />
  );
};

export default Input;

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  setMoveActive: PropTypes.func.isRequired,
  isDisable: PropTypes.bool,
};
