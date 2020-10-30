import React, { useLayoutEffect, useEffect, useState } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components/native";
import Home from "../assets/Svg/Home.svg";
import { Feather } from "@expo/vector-icons";
import { getCorrectUnit, screenInfo, timerFormat } from "../utils";
import EvaluateTable from "../components/EvaluateTable";
import ScrollContainer from "../components/ScrollContainer";
import RecommendQuestResult from "../components/RecommendQuestResult";
import StrongAndWeak from "../components/StrongAndWeak";
import Collapsible from "react-native-collapsible";
import { AntDesign } from "@expo/vector-icons";
import RecommendTable from "../components/RecommendTable";

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
  font-weight: bold;
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
  opacity: 0.3;
`;

const EndQuestReslut = styled.View`
  align-self: center;
  border-width: 0px;
  background-color: #95989a;
  height: 3px;
  width: 100%;
`;

const CollapseButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100px;
  background-color: white;
  margin-bottom: 3px;
`;

const CollapseText = styled.Text`
  text-align: center;
  padding-right: 5px;
  font-size: 16px;
  color: #4f62c0;
  font-weight: bold;
  padding-left: 6px;
`;

const FoldDirection = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

const DevideContainer = styled.View``;

const TmpBox = styled.View`
  width: 95%;
  margin-left: 12px;
  align-items: center;
  justify-content: center;
`;

const RecommendResult = (props) => {
  const { navigation, route } = props;
  const {
    studentAns,
    quests,
    solutions,
    isChoice,
    correctAns,
    monthKey,
    dayKey,
    chapter,
    time,
  } = route.params;
  const [collapsed, setCollapsed] = useState(false);
  const [direction, setdirection] = useState(new Animated.Value(0));
  const rotate = direction.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const questData = {
    1: { questImageUrl: quests[1] },
    2: { questImageUrl: quests[2] },
    3: { questImageUrl: quests[3] },
  };
  const result = `${getCorrectUnit(studentAns, correctAns)}/3 문제`;

  const goToComment = (questNum) => {
    navigation.navigate("진단해설", {
      qNum: questNum,
      studentAns,
      correctAns,
      questData,
      solutions,
      endQuestionNum: Object.keys(studentAns).length,
    });
  };

  useEffect(() => {
    Animated.timing(direction, {
      toValue: collapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.easeInOutCubic,
    }).start();
  }, [collapsed]);

  useLayoutEffect(() => {
    const title = `20${monthKey.slice(0, 2)}년 ${monthKey.slice(
      2
    )}월 ${dayKey}일`;
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftButton onPress={() => navigation.pop(2)}>
          <Feather name="x" size={isTablet ? 34 : 24} color="#4F62C0" />
        </HeaderLeftButton>
      ),
      headerStyle: { backgroundColor: "white", height: 80, elevation: 0 },
      headerTitle: () => (
        <TitleContainer>
          <HeaderTitle>추천문제 풀이결과</HeaderTitle>
          <HeaderSubtitle>{title}</HeaderSubtitle>
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
      <ScrollContainer flexValue={1}>
        <RecommendTable
          time={timerFormat(time[1] + time[2] + time[3])}
          result={result}
        />
        <DevideContainer>
          <DevideBox />
          <CollapseButton
            activeOpacity={1}
            onPress={() => setCollapsed(!collapsed)}
          >
            <CollapseText>풀이결과</CollapseText>
            <FoldDirection style={{ transform: [{ rotate: rotate }] }}>
              <AntDesign
                style={{ marginTop: 3 }}
                name="up"
                size={20}
                color="#4F62C0"
              />
            </FoldDirection>
          </CollapseButton>
        </DevideContainer>
        <Collapsible collapsed={collapsed}>
          <TmpBox>
            {[...Array(Object.keys(studentAns).length)]
              .map((x, i) => i + 1)
              .map((n) => (
                <RecommendQuestResult
                  key={n}
                  questNum={n}
                  studentAns={studentAns[n]}
                  correctAns={correctAns[n]}
                  goToComment={goToComment}
                  isLast={n === Object.keys(studentAns).length}
                  isChoice={isChoice[n]}
                  chapter={chapter[n]}
                  time={timerFormat(time[n], true)}
                />
              ))}
          </TmpBox>
        </Collapsible>
      </ScrollContainer>
    </Container>
  );
};

export default RecommendResult;
