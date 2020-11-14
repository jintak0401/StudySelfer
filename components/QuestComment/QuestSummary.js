import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { screenInfo } from "../../utils";
import { answerFormat } from "./../../utils";

const { isTablet } = screenInfo;

const Container = styled.View`
  padding-horizontal: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 3px;
`;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${isTablet ? 15 : 60}px;
`;

const Right = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.isCorrect ? "flex-end" : "space-between"};
  width: ${isTablet ? 15 : 80}px;
`;

const Text = styled.Text`
  font-size: ${(props) =>
    props.isTablet
      ? props.isChoice && props.hasValue
        ? 20
        : 15
      : props.isChoice && props.hasValue
      ? 20
      : 15}px;
  color: ${(props) => (props.isCorrect ? "#4F62C0" : "red")};
  font-weight: ${(props) =>
    props.isNum || (props.isChoice && props.hasValue) ? "bold" : "normal"};
`;

const QuestSummary = ({ questNum, studentAns, correctAns, isChoice }) => {
  const isCorrect = studentAns === correctAns;
  return (
    <Container>
      <Left>
        <Text isNum={true} isCorrect={true}>
          {questNum}번
        </Text>
        <Feather
          name={isCorrect ? "circle" : "x"}
          size={isTablet ? 34 : 24}
          color={isCorrect ? "#A9E4EB" : "red"}
        />
      </Left>
      <Right isCorrect={isCorrect}>
        {isCorrect ? null : (
          <Text isChoice={isChoice} hasValue={studentAns} isCorrect={isCorrect}>
            {answerFormat(studentAns, isChoice)}
          </Text>
        )}
        <Text isChoice={isChoice} hasValue={true} isCorrect={true}>
          {answerFormat(correctAns, isChoice)}
        </Text>
      </Right>
    </Container>
  );
};

QuestSummary.propTypes = {
  questNum: PropTypes.number.isRequired,
  studentAns: PropTypes.number,
  correctAns: PropTypes.number.isRequired,
};

export default QuestSummary;
