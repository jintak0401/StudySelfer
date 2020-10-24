import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import Home from "../assets/Svg/Home.svg";
import { Feather } from "@expo/vector-icons";
import { screenInfo } from "../utils";
import EvaluateTable from "../components/EvaluateTable";
import ScrollContainer from "../components/ScrollContainer";
import QuestResult from "../components/TestResult/QuestResult";
import StrongAndWeak from "../components/StrongAndWeak";

const { isTablet } = screenInfo;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const TitleContainer = styled.View`
  margin-left: -20px;
  justify-content: center;
`;

const HeaderLeftButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

const HeaderTitle = styled.Text`
  font-size: 23px;
  color: #4f62c0;
`;

const HeaderSubtitle = styled.Text`
  font-size: 15px;
  color: #999999;
`;

const HomeButton = styled.TouchableOpacity`
  margin-right: 25px;
`;

const DevideBox = styled.View`
  align-self: center;
  position: absolute;
  border-bottom-color: #95989a;
  border-bottom-width: 3px;
  height: 50%;
  width: 120%;
`;

const DevideText = styled.Text`
  align-self: center;
  padding-horizontal: 10px;
  background-color: white;
  color: #4f62c0;
`;

const EndQuestReslut = styled.View`
  align-self: center;
  border-width: 0px;
  background-color: #95989a;
  height: 3px;
  width: 100%;
`;

const DevideContainer = styled.View``;

const correctAns = {
  1: 5,
  2: 4,
  3: 1,
  4: 2,
  5: 3,
  6: 1,
  7: 4,
  8: 1,
  9: 5,
  10: 2,
  11: 5,
  12: 4,
  13: 1,
  14: 2,
  15: 3,
  16: 1,
  17: 4,
  18: 1,
  19: 5,
  20: 2,
  21: 5,
  22: 4,
  23: 1,
  24: 2,
  25: 3,
  26: 1,
  27: 4,
  28: 1,
  29: 5,
  30: 2,
};

const EvaluateResult = (props) => {
  const { navigation, route } = props;
  const { studentAns, quests, solutions } = route.params;
  const strong = ["수열의 극한", "적분", "미분"];
  const weak = ["지수함수와 로그함수", "삼각함수", "수열"];

  const goToComment = (questNum) => {
    navigation.navigate("진단해설", {
      qNum: questNum,
      studentAns,
      correctAns,
      questData: quests,
      solutions,
      endQuestionNum: Object.keys(studentAns).length,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftButton onPress={() => navigation.pop(2)}>
          <Feather name="x" size={isTablet ? 34 : 24} color="#4F62C0" />
        </HeaderLeftButton>
      ),
      headerStyle: { backgroundColor: "white", height: 80, elevation: 0 },
      headerTitle: () => (
        <TitleContainer>
          <HeaderTitle>진단 결과</HeaderTitle>
          <HeaderSubtitle>1회차</HeaderSubtitle>
        </TitleContainer>
      ),
      headerRight: () => (
        <HomeButton onPress={() => navigation.popToTop()}>
          <Home width={28} height={28} />
        </HomeButton>
      ),
    });
  }, [route]);
  return (
    <Container>
      <ScrollContainer>
        <EvaluateTable grade={93} />
        <DevideContainer>
          <DevideBox />
          <DevideText>풀이 결과</DevideText>
        </DevideContainer>
        {[...Array(Object.keys(studentAns).length)]
          .map((x, i) => i + 1)
          .map((n) => (
            <QuestResult
              key={n}
              questNum={n}
              studentAns={studentAns[n]}
              correctAns={correctAns[n]}
              goToComment={goToComment}
              isLast={n === Object.keys(studentAns).length}
            />
          ))}
        <EndQuestReslut />
        <StrongAndWeak contents={strong} isStrong={true} />
        <StrongAndWeak contents={weak} isStrong={false} />
      </ScrollContainer>
    </Container>
  );
};

export default EvaluateResult;
