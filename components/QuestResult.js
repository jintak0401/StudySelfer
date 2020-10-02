import React from "react";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { screenInfo } from "../utils";
import PropTypes from "prop-types";

const { isTablet, WIDTH, HEIGHT } = screenInfo;

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
  width: ${(props) => (props.isTablet ? 35 : 45)}%;
`;

const RightWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const QuestNum = styled.Text`
  font-size: ${isTablet ? 25 : 15}px;
  color: #4f62c0;
`;

const Text = styled.Text`
  font-size: ${(props) => (props.isTablet ? 25 : 15)}px;
  color: ${(props) => (props.isCorrect ? "#4F62C0" : "red")};
`;

const GotoSolContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const GotoSolutions = styled.Text`
  font-size: ${(props) => (props.isTablet ? 25 : 15)}px;
  border: 1px solid ${(props) => (props.isCorrect ? "#CCCCCC" : "#4F62C0")};
  color: ${(props) => (props.isCorrect ? "gray" : "white")};
  background-color: ${(props) => (props.isCorrect ? "#F1F9FF" : "#4F62C0")};
  padding-horizontal: 12px;
  border-radius: 23px;
`;

const QuestResult = ({ questNum, studentAns, correctAns, goToComment }) => {
  const isCorrect = studentAns === correctAns;
  return (
    <Container isTablet={isTablet}>
      <Left isTablet={isTablet}>
        <QuestNum>{questNum}번</QuestNum>
        <Feather
          name={isCorrect ? "circle" : "x"}
          size={isTablet ? 34 : 24}
          color={isCorrect ? "#A9E4EB" : "red"}
        />
      </Left>
      <Right isTablet={isTablet} isCorrect={isCorrect}>
        {isCorrect ? null : (
          <>
            <RightWrapper>
              <Text isTablet={isTablet}>{studentAns || "미입력"}</Text>
            </RightWrapper>
            <RightWrapper>
              <Text isTablet={isTablet} isCorrect={true}>
                {correctAns}
              </Text>
            </RightWrapper>
          </>
        )}

        <GotoSolContainer
          isTablet={isTablet}
          onPress={() => goToComment(questNum)}
        >
          <GotoSolutions isTablet={isTablet} isCorrect={isCorrect}>
            해설보기
          </GotoSolutions>
        </GotoSolContainer>
      </Right>
    </Container>
  );
};

QuestResult.propTypes = {
  questNum: PropTypes.number.isRequired,
  studentAns: PropTypes.number,
  correctAns: PropTypes.number.isRequired,
  goToComment: PropTypes.func.isRequired,
};

export default QuestResult;
