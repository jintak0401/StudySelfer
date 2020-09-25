import React from "react";
import { Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";

const Container = styled.View`
  height: 60;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: gray;
`;

const Left = styled.View`
  margin-left: 10px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 15%;
`;

const Right = styled.View`
  margin-right: 10px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 45%;
`;

const Text = styled.Text`
  font-size: 15px;
  color: ${(props) => (props.isCorrect ? "blue" : "red")};
`;

export default (props) => {
  const {
    questNum,
    studentAns,
    correctAns,
    solutions,
    questData,
    navigation,
  } = props;
  const isCorrect = studentAns[questNum] === correctAns[questNum];
  return (
    <Container>
      <Left>
        <Text isCorrect color="blue">
          {questNum}번
        </Text>
        <Feather
          name={isCorrect ? "circle" : "x"}
          size={24}
          color={isCorrect ? "blue" : "red"}
        />
      </Left>
      <Right>
        {isCorrect ? null : (
          <>
            <Text color="red">
              {studentAns[questNum] ? studentAns[questNum] : "입력 없음"}
            </Text>
            <Text isCorrect color="blue">
              {correctAns[questNum]}
            </Text>
          </>
        )}
        <Button
          buttonStyle={{ borderRadius: 100 }}
          title="해설보기"
          onPress={() =>
            navigation.navigate("해설", {
              qNum: questNum,
              studentAns,
              correctAns,
              questData,
              solutions,
            })
          }
        />
      </Right>
    </Container>
  );
};
