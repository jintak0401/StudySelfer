import React from "react";
import { Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { isTablet } from "../utils";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const Container = styled.View`
  height: ${(props) => (props.isTablet ? 100 : 60)}px;
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
  width: ${(props) => (props.isTablet ? 15 : 17)}%;
`;

const Right = styled.View`
  margin-right: 10px;
  justify-content: ${(props) =>
    props.isCorrect ? "flex-end" : "space-between"};
  align-items: center;
  flex-direction: row;
  width: ${(props) => (props.isTablet ? 35 : 50)}%;
`;

const Text = styled.Text`
  font-size: ${(props) => (props.isTablet ? 25 : 15)}px;
  color: ${(props) => (props.isCorrect ? "blue" : "red")};
`;

const GotoSolContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const GotoSolutions = styled.Text`
  font-size: ${(props) => (props.isTablet ? 25 : 15)}px;
  border: 1px solid ${(props) => (props.isCorrect ? "gray" : "blue")};
  color: ${(props) => (props.isCorrect ? "gray" : "white")};
  background-color: ${(props) => (props.isCorrect ? "skyblue" : "blue")};
  padding-horizontal: 12px;
  border-radius: 23px;
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
  const _isTablet = isTablet();
  return (
    <Container isTablet={_isTablet}>
      <Left isTablet={_isTablet}>
        <Text isTablet={_isTablet} isCorrect={isCorrect} color="blue">
          {questNum}번
        </Text>
        <Feather
          name={isCorrect ? "circle" : "x"}
          size={_isTablet ? 34 : 24}
          color={isCorrect ? "blue" : "red"}
        />
      </Left>
      <Right isTablet={_isTablet} isCorrect={isCorrect}>
        {isCorrect ? null : (
          <>
            <Text isTablet={_isTablet} color="red">
              {studentAns[questNum] ? studentAns[questNum] : "입력 없음"}
            </Text>
            <Text isTablet={_isTablet} isCorrect color="blue">
              {correctAns[questNum]}
            </Text>
          </>
        )}
        <GotoSolContainer
          isTablet={_isTablet}
          onPress={() =>
            navigation.navigate("해설", {
              qNum: questNum,
              studentAns,
              correctAns,
              questData,
              solutions,
            })
          }
        >
          <GotoSolutions isTablet={_isTablet} isCorrect={isCorrect}>
            해설보기
          </GotoSolutions>
        </GotoSolContainer>
      </Right>
    </Container>
  );
};
