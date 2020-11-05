/*
Program id: STS-A-2000-S
Writer: HanJinTak(jintak0401@naver.com)
Date: 2020-11-12
Version: 1.0
*/
import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Questions from "../components/Questions";
import Ansbtn from "../components/TestQuestions/Ansbtn";
import Input from "../components/TestQuestions/Input";
import ScrollContainer from "../components/ScrollContainer";
import Timer from "../components/Timer";
import NextAndDontKnow from "../components/NextAndDontKnow";
import Comment from "../components/Comment";
import { apiPostRecommend } from "../api";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const InputContainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;
  margin-bottom: 0px;
`;

const AnsbtnSet = styled.View`
  flex-direction: row;
  align-items: center;
  height: 70px;
`;

const TitleContainer = styled.View`
  margin-left: -20px;
  justify-content: center;
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

const BottomContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const TimeContainer = styled.View`
  align-items: center;
  margin-right: 20px;
  margin-top: 10px;
`;

const RecommendQuestions = (props) => {
  const { route, navigation } = props;
  const {
    quests,
    solutions,
    isChoice,
    correctAns,
    monthKey,
    dayKey,
    chapter,
    id,
  } = props.route.params;
  const [time, setTime] = useState({ 1: 0, 2: 0, 3: 0 });
  const [studentAns, setStudentAns] = useState({
    1: undefined,
    2: undefined,
    3: undefined,
  });
  const [removedAns, setRemovedAns] = useState({});
  const [dontKnow, setDontKnow] = useState(false);
  const [turn, setTurn] = useState("q");
  const [questNum, setQuestNum] = useState(1);
  const [questData, setQuestData] = useState({ questImageUrl: quests[1] });
  const [show, setShow] = useState(true);
  const [tmpTime, setTmpTime] = useState(0);
  const [load, setLoad] = useState(false);

  const initAns = () => {
    setTime(0);
    setAnswer(0);
    setRemovedAns({});
  };

  const goToRecommendResult = async () => {
    setLoad(true);
    const tmp = await apiPostRecommend(removedAns, time, studentAns, id);
    navigation.navigate("추천문제결과", {
      quests,
      solutions,
      isChoice,
      studentAns,
      correctAns,
      monthKey,
      dayKey,
      chapter: chapter,
      time: time,
      popNum: 2,
    });
  };

  const goToNext = () => {
    setTmpTime(0);
    if (turn === "q") {
      setTurn("s");
    } else if (turn === "s") {
      setTurn("q");
      if (questNum != 3) {
        setQuestData({ questImageUrl: quests[questNum + 1] });
        setQuestNum((prev) => prev + 1);
      } else goToRecommendResult();
    }
  };

  const selectAns = (num) => {
    if (isChoice[questNum])
      setStudentAns({
        ...studentAns,
        [questNum]: studentAns[questNum] === num ? 0 : num,
      });
    else setStudentAns({ ...studentAns, [questNum]: num });
  };

  const removingAns = (num) => {
    removedAns[questNum] = removedAns[questNum] || {};
    removedAns[questNum][num] = removedAns[questNum][num] ? false : true;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (turn === "q") {
        setTmpTime(tmpTime + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [tmpTime, questNum]);

  useEffect(() => {
    if (turn === "q") setTime({ ...time, [questNum]: tmpTime });
  }, [tmpTime]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "white", height: 80, elevation: 0 },
      headerTitle: () => (
        <TitleContainer>
          <HeaderTitle>추천문제</HeaderTitle>
          <HeaderSubtitle>{questNum}번 문제</HeaderSubtitle>
        </TitleContainer>
      ),
      headerRight: () => (
        <TimeContainer>
          <Timer time={time[questNum]} />
        </TimeContainer>
      ),
    });
  }, [route, questNum, time]);

  return (
    <Container>
      {load ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#4f62c0" size="large" />
          <Text style={{ fontSize: 30 }}> 로딩중 </Text>
        </View>
      ) : (
        <>
          {turn === "q" ? (
            <>
              <ScrollContainer flexValue={6} footer={70}>
                <Questions questData={quests[questNum]} />
              </ScrollContainer>
              <BottomContainer>
                {isChoice[questNum] ? (
                  <AnsbtnSet>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Ansbtn
                        key={n}
                        ansNum={n}
                        isSelected={studentAns[questNum] === n}
                        selectAns={selectAns}
                        isRemoved={removedAns[questNum]?.[n]}
                        removeAns={removingAns}
                        dontKnow={dontKnow}
                      />
                    ))}
                  </AnsbtnSet>
                ) : (
                  <InputContainer>
                    <Input
                      placeholder={"답을 입력해주세요"}
                      onSubmit={selectAns}
                      defaultValue={studentAns[questNum]}
                      setMoveActive={setShow}
                      dontKnow={dontKnow}
                    />
                  </InputContainer>
                )}
              </BottomContainer>
            </>
          ) : (
            <Comment
              questNum={questNum}
              studentAns={studentAns[questNum]}
              correctAns={correctAns[questNum]}
              questData={quests[questNum]}
              solutions={solutions[questNum]}
              isChoice={isChoice[questNum]}
            />
          )}
          {show ? (
            <NextAndDontKnow
              goToNext={goToNext}
              dontKnow={dontKnow}
              setDontKnow={setDontKnow}
              turn={turn}
            />
          ) : null}
        </>
      )}
    </Container>
  );
};

export default RecommendQuestions;
