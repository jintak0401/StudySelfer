import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Animated } from "react-native";
import DoubleClick from "react-native-double-tap";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-left-width: ${(props) => (!props.isFirst ? 1 : 0)}px;
  border-color: white;
`;

const Button = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 7;
`;

const Text = styled.Text`
  flex: 1;
  height: 100%;
  border-left-width: ${(props) => (!props.isFirst ? 1 : 0)}px;
  border-color: white;
  background-color: ${(props) =>
    props.isSelected ? "#4F62C0" : props.isRemoved ? "#fcffff" : "#CCCCCC"};
  font-weight: bold;
  font-size: 25px;
  color: ${(props) => (props.isRemoved ? "gray" : "white")};
  text-align: center;
  text-align-vertical: center;
`;

const Ansbtn = ({
  ansNum,
  isSelected,
  selectAns,
  isRemoved,
  removeAns,
  dontKnow,
}) => {
  return (
    <DoubleClick
      singleTap={() => {
        isRemoved ? null : selectAns(ansNum);
      }}
      doubleTap={() => {
        isSelected ? null : removeAns(ansNum);
      }}
      delay={200}
      style={{ flex: 1, opacity: dontKnow ? 0.6 : 1 }}
      activeOpacity={0.9}
      disabled={dontKnow}
    >
      <Text
        isFirst={ansNum === 1}
        isSelected={isSelected}
        isRemoved={isRemoved}
      >
        {ansNum}
      </Text>
    </DoubleClick>
  );
};

export default Ansbtn;
