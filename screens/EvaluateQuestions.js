import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {apiPostAnswer} from "../api";
import Questions from "../components/Questions";
import Ansbtn from "../components/TestQuestions/Ansbtn";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const NextButton = styled.TouchableOpacity`
    height: 100px;
    justify-content: center;
    align-items: center;
    background-color: skyblue;
    width: 100%;
`;

const NextText = styled.Text`
    font-size: 20px;
    text-align: center;
    text-align-vertical: center;
    max-height: 60px;
`;

const AnsbtnSet = styled.View`
  flex-direction: row;
  align-items: center;
  height: 70px;
`;

const EvaluateQuestions = (props) => {
    const {route, navigation} = props;
  const {
quest, solution, type
  } = props.route.params;



  const [quests, setQuests] = useState({1: quest});
  const [solutions, setSolutions] = useState({1: solution});
  const [questNum, setQuestNum] = useState(1);
  const [time, setTime] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [removedAns, setRemovedAns] = useState({});
  const [isChoose, setIsChoose] = useState(type);
  const [questData, setQuestData] = useState(quest);

  const initAns = () => {
      setTime(0);
      setAnswer({});
      setRemovedAns({});
  }
  
  const goToEvaluateSolution = () => {
      navigation.navigate("진단평가해설", {questNum: questNum, quests, solutions});
  }

  const postAnswer = async () => {
      const data = await apiPostAnswer(time, answer, removedAns);
    // const quest = await apiPostChapter(part, data);
      if (data.data === "diagnose finished") goToEvaluateSolution();
      const {questionImageUrl, solution, type} = data.data;
      setQuestNum(prev => prev + 1);
      setSolutions({...solutions, solution});
      setIsChoose(type);
      setTime(0);
      initAns();
      setQuestData({questImageUrl: questionImageUrl})
      setQuests({...quests, [questNum]: {questImageUrl: questionImageUrl} });
  }

  const removingAns = (num) => {
    removedAns[num] = removedAns[num] ? false : true;
  }


  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  console.log("\nEvaluateQuestion.js --> questNum\n", questNum, "\n");
 // console.log("\nEvaluateQuestion.js --> quests\n", quests, "\n");
 // console.log("\nEvaluateQuestion.js --> quest\n", quests[questNum], "\n");

  return <Container>
      <Questions
        isTest={true}
        flexValue={6}
        questData={questData}
      />
      {/*isChoose*/true ? (
        <AnsbtnSet>
          {[1, 2, 3, 4, 5].map((n) => (
            <Ansbtn
              key={n}
              ansNum={n}
              isSelected={answer === n}
              selectAns={setAnswer}
              isRemoved={removedAns[n]}
              removeAns={removingAns}
            />
          ))}
        </AnsbtnSet>
      ) : (
        <InputContainer>
          <Input
            placeholder={"답을 입력해주세요"}
            onSubmit={selectAns}
            defaultValue={studentAns[questNum]}
            setMoveActive={setMoveActive}
          />
        </InputContainer>
      )}
      <NextButton onPress={()=>postAnswer()}>
          <NextText>다음 문제</NextText>
      </NextButton>
  </Container>
}

export default EvaluateQuestions;