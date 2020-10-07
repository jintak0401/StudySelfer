import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Animated } from "react-native";
import DoubleClick from "react-native-double-tap";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-color: white;
  height: 100%;
  border-left-width: ${(props) => (!props.isFirst ? 1 : 0)}px;
`;

const Wrapper = styled(Animated.View)`
  height: 100%;
  position: absolute;
  bottom: 0px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const RemoveTag = styled.TouchableOpacity`
  flex: 2;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #999999;
`;

const TagContainer = styled(Animated.View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 7;
`;

const Text = styled.Text`
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isSelected ? "#4F62C0" : "#CCCCCC")};
  font-weight: bold;
  font-size: 25px;
  color: white;
  text-align: center;
  text-align-vertical: center;
`;

const Ansbtn = ({ ansNum, isSelected, selectAns, isRemoved, removeAns }) => {
  const removing = useRef(new Animated.Value(0)).current;
  const goDown = removing.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 70],
  });
  const rotation = removing.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  useEffect(() => {
    Animated.timing(removing, {
      toValue: isRemoved ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isRemoved]);
  return (
    <Container isFirst={ansNum === 1}>
      <Wrapper style={{ transform: [{ translateY: goDown }] }}>
        <RemoveTag
          activeOpacity={0.9}
          onPress={() => (isSelected ? null : removeAns(ansNum))}
        >
          <TagContainer style={{ transform: [{ rotate: rotation }] }}>
            <AntDesign name="down" size={18} color="white" />
          </TagContainer>
        </RemoveTag>
        <Button
          onPress={() => {
            isRemoved ? null : selectAns(ansNum);
          }}
        >
          <Text isSelected={isSelected}>{ansNum}</Text>
        </Button>
      </Wrapper>
    </Container>
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
