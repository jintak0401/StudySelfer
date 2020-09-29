import React from "react";
import * as Progress from "react-native-progress";
import { Text, View, Dimensions } from "react-native";
import { timerFormat } from "./../utils";
import styled from "styled-components/native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.View`
  padding-top: 2px;
  padding-bottom: 8px;
  align-items: center;
`;

const Timer = styled.Text`
  align-self: center;
  color: gray;
  position: absolute;
  font-size: 25px;
`;

export default ({ time, totalTime }) => {
  const fontsize = HEIGHT * 0.020;
  return (
    <Container>
      <Progress.Bar
        progress={1 - time / totalTime}
        color={"skyblue"}
        width={0.9 * WIDTH}
        height={fontsize * 1.2}
        borderRadius={100}
        style={{ justifyContent: "center" }}
      >
        <Text
          style={{
            alignSelf: "center",
            color: "gray",
            position: "absolute",
            fontSize: fontsize,
          }}
        >
          {timerFormat(time)}
        </Text>
      </Progress.Bar>
    </Container>
  );
};
