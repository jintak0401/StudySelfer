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

const Ansbtn = ({ ansNum, isSelected, selectAns, isRemoved, removeAns }) => {
  return (
    <DoubleClick
      singleTap={() => {
        isRemoved ? null : selectAns(ansNum);
      }}
      doubleTap={() => {
        isSelected ? null : removeAns(ansNum);
      }}
      delay={185}
      style={{ flex: 1 }}
      activeOpacity={0.9}
    >
      <Text
        isFirst={ansNum === 1}
        isSelected={isSelected}
        isRemoved={isRemoved}
      >
        {ansNum}
      </Text>
    </DoubleClick>
    // <Text isFirst={ansNum === 1} isSelected={isSelected} isRemoved={isRemoved}>
    //   <Wrapper style={{ transform: [{ translateY: goDown }] }}>
    //     <RemoveTag
    //       activeOpacity={0.9}
    //       onPress={() => (isSelected ? null : removeAns(ansNum))}
    //     >
    //       <TagContainer style={{ transform: [{ rotate: rotation }] }}>
    //         <AntDesign name="down" size={18} color="white" />
    //       </TagContainer>
    //     </RemoveTag>
    //     <Button
    //       onPress={() => {
    //         isRemoved ? null : selectAns(ansNum);
    //       }}
    //     >
    //       <Text isSelected={isSelected}>{ansNum}</Text>
    //     </Button>
    //   </Wrapper>
    // </Container>
    //  {/* <Button
    //   isFirst={ansNum === 1}
    //   onPress={() => {
    //     selectAns(ansNum);
    //   }}
    // >
    //   <Text isRemoved={isRemoved} isSelected={isSelected}>
    //     {ansNum}
    //   </Text>
    // </Button> */}
  );
};

export default Ansbtn;
