import React from "react";
import styled from "styled-components/native";
import DoubleClick from "react-native-double-tap";

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
