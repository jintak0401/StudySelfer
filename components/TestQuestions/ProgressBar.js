import React from "react";
import * as Progress from "react-native-progress";
import { Text } from "react-native";
import styled from "styled-components/native";
import { timerFormat, screenInfo } from "./../../utils";

const { isTablet, WIDTH } = screenInfo;

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
  const fontsize = isTablet ? 20 : 16;
  return (
    <Container>
      <Progress.Bar
        progress={1 - time / totalTime}
        color={"#A9E4EB"}
        width={parseInt(0.9 * WIDTH)}
        height={19}
        borderRadius={100}
        style={{ justifyContent: "center" }}
      >
        <Text
          style={{
            alignSelf: "center",
            color: "#999999",
            position: "absolute",
            fontSize: fontsize,
          }}
        >
          {timerFormat(time, true)}
        </Text>
      </Progress.Bar>
    </Container>
  );
};
