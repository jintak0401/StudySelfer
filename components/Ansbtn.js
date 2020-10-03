import React from "react";
import styled from "styled-components/native";
// import { View, Button } from "react-native";

const Button = styled.TouchableHighlight`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-color: white;
  border-left-width: ${(props) => (!props.isFirst ? 1 : 0)}px;
`;

const Text = styled.Text`
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isSelected ? "#4F62C0" : "#CCCCCC")};
  font-weight: bold;
  font-size: 22px;
  color: white;
  text-align: center;
  padding-vertical: 10px;
`;

const Ansbtn = (props) => {
  const { ansNum, isSelected, selectAns } = props;
  return (
    <Button
      isFirst={ansNum === 1}
      onPress={() => {
        selectAns(ansNum);
      }}
    >
      <Text isSelected={isSelected}>{ansNum}</Text>
    </Button>
  );
};

export default Ansbtn;
