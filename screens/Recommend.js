import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  SectionList,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import Profile from "../assets/Svg/Profile.svg";
import SelectRecommend from "../components/SelectRecommend";
import {
  getRecommendData,
  getTodayDateKey,
  solvedData,
  getRecommendStudentData,
} from "../solvedData";
import { screenInfo, getIsGoBack, resetIsGoBack } from "../utils";
import { AfterRecommend, BeforeRecommend } from "../assets/Svg";
import SelectRecommendMonth from "../components/SelectRecommendMonth";
import SelectRecommendDay from "../components/SelectRecommendDay";
import { BackMark } from "../assets/Svg";
import {
  apiGetRecommend,
  apiTestAns,
  apiTestQuests,
  apiTestSolutions,
} from "../api";

const { WIDTH } = screenInfo;
const { recommend: recommendData } = solvedData;

const BookButton = styled.TouchableOpacity`
  margin-left: 30px;
`;

const HeaderTitle = styled.Text`
  font-size: 26px;
  color: white;
  margin-left: -15px;
  font-family: Ssangmoon;
`;

const ProfileButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const SelectYearMonthContainer = styled.View`
  flex: 7.6;
  width: 100%;
  align-items: center;
`;

const ListContainer = styled.ScrollView`
  flex: 7;
  width: 100%;
`;

const SectionContainer = styled.View`
  margin-vertical: 15px;
  justify-content: center;
  align-items: center;
  width: 95%;
  margin-left: 10px;
`;

const SelectedYearContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 0.6;
  width: 85%;
  margin-left: 10px;
`;

const BackButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const SelectedYearText = styled.Text`
  color: #4f62c0;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-bottom: 3px;
`;

const EmptyBox = styled.View`
  height: 30px;
`;

const TodayButton = styled.TouchableOpacity`
  border-radius: 50px;
  margin-top: 100px;
  width: ${WIDTH * 0.85}px;
  height: ${WIDTH * 0.756 * 0.85}px;
`;

const RecommendBack = styled.ImageBackground`
  width: 100%;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;

const RecommendTitle = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: bold;
  font-family: NanumSquare;
  margin-left: 15px;
  margin-top: 15px;
`;

const RecommendChap = styled.Text`
  color: #4f62c0;
  font-size: 17px;
  margin-left: 20px;
  font-weight: bold;
  margin-top: ${(props) => (props.isFirst ? 20 : 10)}px;
`;

const RecommendComment = styled.Text`
  color: #4f62c0;
  font-weight: bold;
  align-self: center;
  font-size: 20px;
  margin-top: 80px;
`;

export default (props) => {
  const { navigation, route } = props;
  const [selectedTab, setSelectedTab] = useState(undefined);
  const [todaySolved, setTodaySolved] = useState(true);
  const [chaps, setChaps] = useState([
    "여러가지 함수의 극한",
    "미분계수와 도함수",
    "평면벡터의 성분과 내적",
  ]);
  const [monthKey, setMonthKey] = useState(undefined);
  const [dayKey, setDayKey] = useState(undefined);

  const resetKey = () => {
    setMonthKey(undefined);
    setDayKey(undefined);
  };

  const selectDay = (keyValue) => {
    setDayKey((prev) => (prev === keyValue ? undefined : keyValue));
  };

  const goToResult = async () => {
    const data = await apiGetRecommend();
    const [_monthKey, _dayKey] = getTodayDateKey();
    if (!(monthKey && dayKey)) {
      setMonthKey(_monthKey);
      setDayKey(_dayKey);
    }
    const { studentAns, time } = getRecommendStudentData(monthKey, dayKey);
    navigation.navigate("추천문제결과", {
      ...data,
      monthKey: _monthKey,
      dayKey: _dayKey,
      studentAns: studentAns,
      time: time,
      chapter: {
        1: chaps[0],
        2: chaps[1],
        3: chaps[2],
      },
    });
  };

  const goToQuestions = async () => {
    // 오늘의 추천문제
    if (!monthKey) {
      const data = await apiGetRecommend();
      const [_monthKey, _dayKey] = getTodayDateKey();
      navigation.navigate("추천문제", {
        ...data,
        monthKey: _monthKey,
        dayKey: _dayKey,
        chapter: {
          1: chaps[0],
          2: chaps[1],
          3: chaps[2],
        },
      });
    }
    // 지난 추천문제
    else {
      const data = await apiGetRecommend();
      navigation.navigate("추천문제", {
        ...data,
        monthKey: monthKey,
        dayKey: dayKey,
        chapter: {
          1: chaps[0],
          2: chaps[1],
          3: chaps[2],
        },
      });
    }
  };

  useEffect(() => {
    const refresh = navigation.addListener("focus", () => {
      setTodaySolved(getRecommendData());
      resetKey();
      if (getIsGoBack()) {
        resetIsGoBack();
        setSelectedTab("today");
      }
    });
    return refresh;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "white",
      headerStyle: { backgroundColor: "#4F62C0", height: 60 },
      headerTitle: () => <HeaderTitle>추천문제</HeaderTitle>,
      headerRight: () => (
        <ProfileButton>
          <Profile width={30} height={30} />
        </ProfileButton>
      ),
    });
  }, [route]);

  return (
    <Container>
      <SelectRecommend
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        resetKey={resetKey}
      />
      <SelectYearMonthContainer>
        {selectedTab === "today" ? (
          <TodayButton
            onPress={() => {
              if (!todaySolved) {
                goToQuestions();
              } else if (todaySolved) {
                goToResult();
              }
            }}
            activeOpacity={0.7}
          >
            <RecommendBack source={require("../assets/Png/RecommendBack.png")}>
              {todaySolved ? (
                <>
                  <AfterRecommend
                    style={{ position: "absolute", right: 25, bottom: 0 }}
                    width={120}
                    height={200}
                  />
                  <RecommendTitle>
                    오늘의 추천문제를{"\n"}풀었어요
                  </RecommendTitle>
                  <RecommendComment>결과를 확인해볼까요?</RecommendComment>
                </>
              ) : (
                <>
                  <BeforeRecommend
                    style={{ position: "absolute", right: 25, bottom: 0 }}
                    width={120}
                    height={200}
                  />
                  <RecommendTitle>오늘의 추천문제 단원</RecommendTitle>
                  {Object.keys(chaps).map((val, idx) => (
                    <RecommendChap key={idx} isFirst={idx === 0}>
                      {chaps[val]}
                    </RecommendChap>
                  ))}
                </>
              )}
            </RecommendBack>
          </TodayButton>
        ) : selectedTab === "past" ? (
          monthKey ? (
            <>
              <SelectedYearContainer>
                <BackButton
                  onPress={() => {
                    resetKey();
                  }}
                >
                  <BackMark width={18} height={18} />
                </BackButton>
                <SelectedYearText>{`20${monthKey.slice(
                  0,
                  2
                )}년 ${monthKey.slice(2)}월`}</SelectedYearText>
              </SelectedYearContainer>
              <ListContainer>
                {Object.keys(recommendData[monthKey]).map((keyValue, idx) => (
                  <SectionContainer key={idx}>
                    <SelectRecommendDay
                      monthKey={monthKey}
                      dayKey={dayKey}
                      keyValue={keyValue}
                      selectDay={selectDay}
                      goToResult={goToResult}
                      goToQuestions={goToQuestions}
                    />
                  </SectionContainer>
                ))}
              </ListContainer>
            </>
          ) : (
            <>
              <EmptyBox />
              <ListContainer showsVerticalScrollIndicator={false}>
                {Object.keys(recommendData).map((keyValue, idx) => (
                  <SectionContainer key={idx}>
                    <SelectRecommendMonth
                      keyValue={keyValue}
                      setMonthKey={setMonthKey}
                    />
                  </SectionContainer>
                ))}
              </ListContainer>
            </>
          )
        ) : null}
      </SelectYearMonthContainer>
      <Button
        title="RESET"
        onPress={() => {
          setTodaySolved((prev) => !prev);
          setMonthKey(undefined);
          setDayKey(undefined);
        }}
      />
    </Container>
  );
};
