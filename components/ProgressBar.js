import React from "react";
import * as Progress from "react-native-progress";
import { Text, View } from "react-native";
import { timerFormat } from "./../utils";
import styled from "styled-components/native";

const Container = styled.View`
  padding-top: 2px;
  padding-bottom: 8px;
  align-items: center;
`;

export default ({ time, totalTime }) => {
  return (
    <Container>
      <Progress.Bar
        progress={1 - time / totalTime}
        color={"skyblue"}
        width={330}
        height={20}
        borderRadius={10}
        style={{ justifyContent: "center" }}
      >
        <Text
          style={{
            alignSelf: "center",
            color: "gray",
            position: "absolute",
            fontSize: 15,
          }}
        >
          {timerFormat(time)}
        </Text>
      </Progress.Bar>
    </Container>
  );
};
