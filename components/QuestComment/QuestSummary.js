import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { screenInfo } from "../../utils";
import { answerFormat } from "./../../utils";
import colorset from "../../colorset";

const { isTablet } = screenInfo;

const Container = styled.View`
  padding-horizontal: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 3px;
  ${(props) => props.needMargin && "margin-top: 120px"};
`;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${isTablet ? 15 : 60}px;
  ${(props) => props.isInTest && "margin-left: 0px"};
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
  color: ${(props) => (props.isCorrect ? "#4F62C0" : colorset.cherry)};
  font-weight: ${(props) =>
    props.isNum || (props.isChoice && props.hasValue) ? "bold" : "normal"};
`;

const QuestNumText = styled.Text`
  font-family: HGG60;
  font-size: 15px;
`;

const StudentAns = styled.Text`
  font-size: ${(props) => (props.isChoice && props.hasValue ? 20 : 15)}px;
  font-family: HGG60;
  color: ${(props) => (props.isCorrect ? colorset.lightBlue : colorset.cherry)};
`;

const CorrectAns = styled.Text`
  font-size: ${(props) => (props.isChoice ? 20 : 15)}px;
  font-family: HGG60;
  color: ${colorset.lightBlue};
`;

const QuestSummary = ({
  questNum,
  studentAns,
  correctAns,
  isChoice,
  needMargin,
  isInTest,
}) => {
  const isCorrect = studentAns === correctAns;
  return (
    <Container needMargin={needMargin}>
      <Left isInTest={isInTest}>
        <QuestNumText>{questNum}번</QuestNumText>
        {/* <Text isNum={true} isCorrect={true}>
          {questNum}번
        </Text> */}
        <Feather
          name={isCorrect ? "circle" : "x"}
          size={isTablet ? 34 : 24}
          color={isCorrect ? "#A9E4EB" : colorset.cherry}
        />
      </Left>
      <Right isCorrect={isCorrect}>
        {isCorrect ? null : (
          <StudentAns
            isChoice={isChoice}
            hasValue={studentAns}
            isCorrect={isCorrect}
          >
            {answerFormat(studentAns, isChoice)}
          </StudentAns>
        )}
        <CorrectAns isChoice={isChoice} isCorrect={true}>
          {answerFormat(correctAns, isChoice)}
        </CorrectAns>
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
