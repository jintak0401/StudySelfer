import React from "react";
import styled from "styled-components/native";
import DoubleClick from "react-native-double-tap";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import colorset from "../../colorset";

const ButtonText = styled.Text`
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
      style={{
        flex: 1,
        opacity: dontKnow ? 0.6 : 1,
        borderRadiusTopLeft: 10,
        borderRadiusTopRight: 10,
      }}
      activeOpacity={0.9}
      disabled={dontKnow}
    >
      <LinearGradient
        colors={
          isRemoved
            ? ["white", "white"]
            : isSelected
            ? [colorset.gradFromBlue, colorset.gradToBlue]
            : [colorset.gradFromGray, colorset.gradToGray]
        }
        start={[0, 0]}
        end={[1, 1]}
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          width: "97%",
          height: "100%",
        }}
      >
        <Text
          style={{
            backgroundColor: "transparent",
            fontSize: 25,
            color: isRemoved ? "gray" : "#fff",
            fontFamily: "HGG80",
          }}
        >
          {ansNum}
        </Text>
      </LinearGradient>
      {/* <ButtonText
        isFirst={ansNum === 1}
        isSelected={isSelected}
        isRemoved={isRemoved}
      >
        {ansNum}
      </ButtonText> */}
    </DoubleClick>
  );
};

export default Ansbtn;
