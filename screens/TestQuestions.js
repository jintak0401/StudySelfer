import React, { useState, useEffect } from "react";
import Questions from "../components/Questions";
import { apiTestQuests } from "./../api";
import ProgressBar from "../components/ProgressBar";
import styled from "styled-components/native";
import TestAdditionalFunc from "./../components/TestAdditionalFunc";
import Ansbtn from "../components/Ansbtn";
import Input from "../components/Input";
import { View } from "react-native";
import MoveQuestBtn from "./../components/MoveQuestBtn";

const IconSet = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 20px;
  margin-top: 10px;
`;

const Container = styled.View`
  background-color: white;
  flex: 1;
`;

const AnsbtnSet = styled.View`
  flex-direction: row;
  bottom: 0px;
  position: absolute;
  align-items: center;
`;

const InputContainer = styled.View`
  align-items: center;
`;

const MoveQuestBtnSet = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 60px;
  justify-content: space-between;
  width: 100%;
`;

const RightBtn = styled.TouchableOpacity`
  margin-right: 10px;
`;

const LeftBtn = styled.TouchableOpacity`
  margin-left: 10px;
`;

export default ({ navigation }) => {
  const [questNum, setQuestNum] = useState(30);
  const [studentAns, setStudentAns] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [questData, setQuestData] = useState({});
  const [testTime, readyTime] = [6000, 5];
  const [time, setTime] = useState(testTime + readyTime);
  const [clock, setClock] = useState(false);
  const moveQuestIcon = {
    left: "leftcircle",
    right: "rightcircle",
    done: "checkcircle",
  };

  const getQuestData = async () => {
    const tmp = await apiTestQuests();
    setQuestData({ ...tmp });
  };
  const bookmarking = (n) => {
    const tmp = { ...bookmarks };
    tmp[n] = !tmp[n];
    setBookmarks({ ...tmp });
  };
  const activateClock = (n) => setClock(!clock);
  const selectAns = (n) => {
    const tmp = { ...studentAns };
    if (questNum <= 21) tmp[questNum] = studentAns[questNum] === n ? 0 : n;
    else tmp[questNum] = n;
    setStudentAns({ ...tmp });
  };
  const changeQuestNum = (num) => {
    if (1 <= num && num <= 30) {
      setQuestNum(num);
    }
  };
  useEffect(() => {
    getQuestData();
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <IconSet>
        <TestAdditionalFunc
          funcName="clock"
          isActive={clock}
          setActive={activateClock}
          questNum={questNum}
        />
        <TestAdditionalFunc
          funcName="bookmark"
          isActive={bookmarks[questNum]}
          setActive={bookmarking}
          questNum={questNum}
        />
        <TestAdditionalFunc funcName="subtitles" />
      </IconSet>
      {clock ? (
        <ProgressBar time={time} totalTime={testTime + readyTime} />
      ) : null}
      <Questions questNum={questNum} questData={questData[questNum]} />
      {questNum <= 21 ? (
        <AnsbtnSet>
          {[1, 2, 3, 4, 5].map((n) => (
            <Ansbtn
              key={`${questNum}${n}`}
              ansNum={n}
              isSelected={studentAns[questNum] === n}
              selectAns={selectAns}
            />
          ))}
        </AnsbtnSet>
      ) : (
        <InputContainer>
          <Input
            placeholder={"답을 입력해주세요"}
            onSubmit={selectAns}
            defaultValue={studentAns[questNum]}
          />
        </InputContainer>
      )}
      <MoveQuestBtn
        inTest={true}
        questNum={questNum}
        changeQuestNum={changeQuestNum}
        time={readyTime + testTime - time}
        questData={questData}
        studentAns={studentAns}
      />
    </Container>
  );
};
