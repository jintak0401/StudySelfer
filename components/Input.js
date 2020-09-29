import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const NumberInput = styled.TextInput`
  background-color: white;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  border: 1px solid black;
  width: 80%;
`;

const Input = ({ placeholder, onSubmit, defaultValue }) => {
  const [input, setInput] = useState("");
  const inputNum = (text) => {
    setInput(text);
  };
  useEffect(() => {
    setInput(defaultValue ? `${defaultValue}` : "");
  }, [defaultValue]);
  return (
    <NumberInput
      placeholder={placeholder}
      returnKeyType={"done"}
      keyboardType="numeric"
      value={input}
      onChangeText={(text) => setInput(text)}
      onSubmitEditing={() => onSubmit(Number(input))}
    />
  );
};

export default Input;

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};
