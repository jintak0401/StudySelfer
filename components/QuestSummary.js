import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { screenInfo } from "../utils";

const { isTablet, WIDTH, HEIGHT } = screenInfo;

const Container = styled.View`
  padding-horizontal: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 10px;
`;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${isTablet ? 15 : 20}%;
`;

const Right = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.isCorrect ? "flex-end" : "space-between"};
  width: ${isTablet ? 15 : 25}%;
`;

const Text = styled.Text`
  color: ${(props) => (props.isCorrect ? "#4F62C0" : "red")};
  font-size: ${isTablet ? 25 : 15}px;
`;

const QuestSummary = ({ questNum, studentAns, correctAns }) => {
  const isCorrect = studentAns === correctAns;
  return (
    <Container>
      <Left>
        <Text isCorrect={true}>{questNum}번</Text>
        <Feather
          name={isCorrect ? "circle" : "x"}
          size={isTablet ? 34 : 24}
          color={isCorrect ? "#A9E4EB" : "red"}
        />
      </Left>
      <Right isCorrect={isCorrect}>
        {isCorrect ? null : (
          <Text isCorrect={isCorrect}>{studentAns || "미입력"}</Text>
        )}
        <Text isCorrect={true}>{correctAns}</Text>
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
