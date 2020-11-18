import React, { useLayoutEffect, useEffect, useState } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import Home from "../assets/Svg/Home.svg";
import { Feather } from "@expo/vector-icons";
import { getCorrectUnit, screenInfo, setIsGoBack, timerFormat } from "../utils";
import ScrollContainer from "../components/ScrollContainer";
import RecommendQuestResult from "../components/RecommendQuestResult";
import Collapsible from "react-native-collapsible";
import RecommendTable from "../components/RecommendTable";
import { getTodayDateKey, setRecommendData, solvedData } from "../solvedData";
import RecommendBottom from "../components/RecommendBottom";
import colorset from "../colorset";

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
  color: white;
  margin-top: 20px;
  font-family: HGG80;
`;

const HeaderSubtitle = styled.Text`
  font-size: 15px;
  color: ${colorset.skyblue};
  font-family: HGG60;
  margin-top: 5px;
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
  width: 85%;
  opacity: 0.3;
`;

const CollapseButton = styled.View`
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
  padding-left: 6px;
  font-family: HGG80;
`;

const DevideContainer = styled.View`
  margin-top: 20px;
`;

const TmpBox = styled.View`
  width: 95%;
  margin-left: 12px;
  align-items: center;
  justify-content: center;
`;

const HeaderImage = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 3.987;
  position: absolute;
  top: 0;
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
  const questData = {
    1: { questImageUrl: quests[1] },
    2: { questImageUrl: quests[2] },
    3: { questImageUrl: quests[3] },
  };
  const result = `${getCorrectUnit(studentAns, correctAns)}/3 문제`;
  const totalTime = time[1] + time[2] + time[3];
  const [todayDone] = useState(() => {
    const [todayMonthKey, todayDayKey] = getTodayDateKey();
    const isToday = todayMonthKey === monthKey && todayDayKey === dayKey;
    return isToday || solvedData.recommend[todayMonthKey]?.[todayDayKey]
      ? true
      : false;
  });

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

  const goBackTodayRecommend = () => {
    setIsGoBack();
    navigation.pop(2);
  };

  useLayoutEffect(() => {
    const title = `20${monthKey.slice(0, 2)}년 ${monthKey.slice(
      2
    )}월 ${dayKey}일`;
    navigation.setOptions({
      headerStyle: { backgroundColor: "white", height: 80, elevation: 0 },
      headerTransparent: true,
      headerLeft: () => (
        <HeaderLeftButton onPress={() => navigation.pop(2)}>
          <Feather name="x" size={isTablet ? 34 : 24} color="white" />
        </HeaderLeftButton>
      ),
      headerTitle: () => (
        <TitleContainer>
          <HeaderTitle>추천문제 풀이결과</HeaderTitle>
          <HeaderSubtitle>{title}</HeaderSubtitle>
        </TitleContainer>
      ),
      headerRight: () => (
        <HomeButton onPress={() => navigation.pop(2)}>
          <Home width={28} height={28} />
        </HomeButton>
      ),
    });
  }, [route]);

  useEffect(() => {
    setRecommendData(timerFormat(totalTime), result, monthKey, dayKey);
  }, []);

  return (
    <Container>
      <ScrollContainer isQuest={true} flexValue={1}>
        <RecommendTable time={timerFormat(totalTime, true)} result={result} />
        <DevideContainer>
          <DevideBox />
          <CollapseButton>
            <CollapseText>풀이결과</CollapseText>
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
        <RecommendBottom
          goBackTodayRecommend={goBackTodayRecommend}
          todayDone={todayDone}
        />
      </ScrollContainer>
      <HeaderImage
        source={require("../assets/Png/HeaderBackRect.png")}
      ></HeaderImage>
    </Container>
  );
};

export default RecommendResult;
