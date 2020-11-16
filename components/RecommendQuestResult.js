import React from "react";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { screenInfo } from "../utils";
import PropTypes from "prop-types";
import Dash from "react-native-dash";
import { answerFormat } from "../utils";
import colorset from "../colorset";
import { GoToSolutionBtn, GoToSolutionBtnActive } from "../assets/Svg";

const { isTablet } = screenInfo;

const Container = styled.View`
  height: ${(props) => (props.isTablet ? 100 : 100)}px;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  padding-top: 5px;
`;

const UpContainer = styled.View`
  height: ${(props) => (props.isTablet ? 100 : 40)}px;
  width: 90%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const DownContainer = styled.View`
  width: 90%;
  height: 10px;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 5px;
`;

const ChapContainer = styled.View`
  width: 65%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding-left: 10px;
`;

const TimeContainer = styled.View`
  width: 35%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

const DownText = styled.Text`
  font-weight: ${(props) => (props.isTitle ? "bold" : "normal")};
  color: #999999;
`;

const Left = styled.View`
  margin-left: 10px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: ${(props) => (props.isTablet ? 15 : 65)}px;
`;

const Right = styled.View`
  margin-right: 10px;
  justify-content: ${(props) =>
    props.isCorrect ? "flex-end" : "space-between"};
  align-items: center;
  flex-direction: row;
  width: ${(props) => (props.isTablet ? 35 : 170)}px;
`;

const RightWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const QuestNum = styled.Text`
  font-size: ${isTablet ? 25 : 15}px;
  font-family: HGG60;
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
  color: ${(props) => (props.isCorrect ? colorset.lightBlue : colorset.cherry)};
  font-weight: ${(props) =>
    props.isChoice && props.hasValue ? "bold" : "normal"};
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

const QuestResult = ({
  questNum,
  studentAns,
  correctAns,
  goToComment,
  isChoice,
  isLast,
  chapter,
  time,
}) => {
  const isCorrect = studentAns === correctAns;
  return (
    <Container isTablet={isTablet}>
      <UpContainer>
        <Left isTablet={isTablet}>
          <QuestNum>{questNum}번</QuestNum>
          <Feather
            name={isCorrect ? "circle" : "x"}
            size={isTablet ? 34 : 24}
            color={isCorrect ? colorset.emerald : colorset.cherry}
          />
        </Left>
        <Right isTablet={isTablet} isCorrect={isCorrect}>
          {isCorrect ? null : (
            <>
              <RightWrapper>
                <Text
                  isChoice={isChoice}
                  hasValue={studentAns}
                  isTablet={isTablet}
                >
                  {answerFormat(studentAns, isChoice)}
                </Text>
              </RightWrapper>
              <RightWrapper>
                <Text
                  isChoice={isChoice}
                  hasValue={true}
                  isTablet={isTablet}
                  isCorrect={true}
                >
                  {answerFormat(correctAns, isChoice)}
                </Text>
              </RightWrapper>
            </>
          )}
          {isCorrect ? (
            <GoToSolutionBtn
              style={{ marginLeft: 10 }}
              width={100}
              height={50}
              onPress={() => goToComment(questNum)}
            />
          ) : (
            <GoToSolutionBtnActive
              style={{ marginLeft: 10 }}
              width={100}
              height={50}
              onPress={() => goToComment(questNum)}
            />
          )}

          {/* <GotoSolContainer
            isTablet={isTablet}
            onPress={() => goToComment(questNum)}
          >
            <GotoSolutions isTablet={isTablet} isCorrect={isCorrect}>
              해설보기
            </GotoSolutions>
          </GotoSolContainer> */}
        </Right>
      </UpContainer>
      <DownContainer>
        <ChapContainer>
          <DownText isTitle>해당 문제 단원 | </DownText>
          <DownText>{chapter}</DownText>
        </ChapContainer>
        <TimeContainer>
          <DownText isTitle>풀이시간 | </DownText>
          <DownText>{time}</DownText>
        </TimeContainer>
      </DownContainer>
      {isLast ? null : (
        <Dash
          style={{ position: "absolute", bottom: 0, width: "100%", height: 1 }}
          dashGap={3}
          dashLength={5}
          dashThickness={1}
          dashColor={"#999999"}
        />
      )}
    </Container>
  );
};

QuestResult.propTypes = {
  questNum: PropTypes.number.isRequired,
  studentAns: PropTypes.number,
  correctAns: PropTypes.number.isRequired,
  goToComment: PropTypes.func.isRequired,
  isChoice: PropTypes.bool.isRequired,
  isLast: PropTypes.bool,
  chapter: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default QuestResult;
