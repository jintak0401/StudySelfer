import React, { useLayoutEffect, useEffect, useState } from "react";
import { Switch } from "react-native";
import styled from "styled-components/native";
import { apiPostAnswer } from "../api";
import Questions from "../components/Questions";
import Ansbtn from "../components/TestQuestions/Ansbtn";
import TimeAndNext from "../components/TimeAndNext";
import Input from "../components/TestQuestions/Input";
import ScrollContainer from "../components/ScrollContainer";

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
`;

const HeaderSubtitle = styled.Text`
  font-size: 15px;
  color: #999999;
`;

const BottomContainer = styled.View`
  height: 150px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const EvaluateQuestions = (props) => {
  const { route, navigation } = props;
  const { quest, solution, type } = props.route.params;
  const [showBottom, setShowBottom] = useState(true);
  const [quests, setQuests] = useState({ 1: quest });
  const [solutions, setSolutions] = useState({ 1: solution });
  const [questNum, setQuestNum] = useState(1);
  const [time, setTime] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [removedAns, setRemovedAns] = useState({});
  const [isChoiceProb, setIsChoiceProb] = useState(type);
  const [questData, setQuestData] = useState(quest);
  const [dontKnow, setDontKnow] = useState(false);
  const [studentAns, setStudentAns] = useState({});

  const initAns = () => {
    setTime(0);
    setAnswer(0);
    setRemovedAns({});
  };

  const selectAns = (num) => {
    if (isChoiceProb) setAnswer((prev) => (prev === num ? 0 : num));
    else setAnswer(num);
  };

  const goToEvaluateSolution = () => {
    console.log("EvaluateQuestions.js", studentAns, quests, solutions);
    navigation.navigate("진단평가결과", {
      studentAns,
      quests,
      solutions,
    });
  };

  const goToNext = () => {
    setStudentAns({ ...studentAns, [questNum]: answer });
  };

  useEffect(() => {
    const postAnswer = async () => {
      const data = await apiPostAnswer(time, answer, removedAns);
      if (data.data === "diagnose finished") goToEvaluateSolution();
      else {
        const {
          questionImageUrl,
          solutionImageUrl: solution,
          type,
        } = data.data;
        setSolutions({ ...solutions, [questNum + 1]: solution });
        setQuests({
          ...quests,
          [questNum + 1]: { questImageUrl: questionImageUrl },
        });
        setQuestData({ questImageUrl: questionImageUrl });
        setIsChoiceProb(type);
        setTime(0);
        initAns();
        setDontKnow(false);
        setQuestNum((prev) => prev + 1);
      }
    };
    if (Object.keys(studentAns).length != 0) postAnswer();
  }, [studentAns]);

  // useEffect(() => {
  //   setSolutions({ ...solutions, [questNum]: solution });
  //   setQuests({ ...quests, [questNum]: questData });
  //   console.log("EvaluateQuestions.js", solutions);
  // }, [questNum]);

  const removingAns = (num) => {
    removedAns[num] = removedAns[num] ? false : true;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "white", height: 80, elevation: 0 },
      headerTitle: () => (
        <TitleContainer>
          <HeaderTitle>진단평가</HeaderTitle>
          <HeaderSubtitle>{questNum}번 문제</HeaderSubtitle>
        </TitleContainer>
      ),
    });
  }, [route, questNum]);

  return (
    <Container>
      <ScrollContainer flexValue={6}>
        <Questions isTest={true} flexValue={6} questData={questData} />
      </ScrollContainer>
      <BottomContainer>
        {isChoiceProb ? (
          <AnsbtnSet>
            {[1, 2, 3, 4, 5].map((n) => (
              <Ansbtn
                key={n}
                ansNum={n}
                isSelected={answer === n}
                selectAns={selectAns}
                isRemoved={removedAns[n]}
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
              defaultValue={answer}
              setMoveActive={setShowBottom}
              dontKnow={dontKnow}
            />
          </InputContainer>
        )}
        {showBottom ? (
          <TimeAndNext
            time={time}
            goToNext={goToNext}
            dontKnow={dontKnow}
            setDontKnow={setDontKnow}
          />
        ) : null}
      </BottomContainer>
    </Container>
  );
};

export default EvaluateQuestions;
