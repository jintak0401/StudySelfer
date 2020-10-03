import React, { useState, useEffect, useLayoutEffect } from "react";
import Questions from "../components/Questions";
import { apiTestQuests } from "./../api";
import ProgressBar from "../components/ProgressBar";
import styled from "styled-components/native";
import TestAdditionalFunc from "./../components/TestAdditionalFunc";
import Ansbtn from "../components/Ansbtn";
import Input from "../components/Input";
import MoveQuestBtn from "./../components/MoveQuestBtn";
import ModalAnsSheet from "./../components/ModalAnsSheet";
import Collapsible from "react-native-collapsible";
import ModalSubmit from "./../components/ModalSubmit";

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

export default ({ navigation, route }) => {
  const [questNum, setQuestNum] = useState(30);
  const [studentAns, setStudentAns] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [questData, setQuestData] = useState({});
  const [testTime, readyTime] = [6000, 5];
  const [time, setTime] = useState(testTime + readyTime);
  const [clock, setClock] = useState(false);
  const [answersheetModalVisible, setAnswersheetModalVisible] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);

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
  const setModal = (n) => setAnswersheetModalVisible(!answersheetModalVisible);
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

  const goToResult = () => {
    navigation.navigate("모의시험 결과", {
      time: time,
      year: route.params.year,
      month: route.params.month,
      questData,
      studentAns,
      bookmarks,
    });
  };
  useEffect(() => {
    getQuestData();
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    if (time === 0) goToResult();
    return () => {
      clearInterval(interval);
    };
  }, [time]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "white", height: 80, elevation: 0 },
      headerTitle: () => (
        <TitleContainer>
          <HeaderTitle>모의고사 풀기</HeaderTitle>
          <HeaderSubtitle>{route.params.subtitle}</HeaderSubtitle>
        </TitleContainer>
      ),
      headerRight: () => (
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
          <TestAdditionalFunc
            funcName="subtitles"
            setActive={setModal}
            questNum={questNum}
          />
        </IconSet>
      ),
    });
  }, [route, clock, questNum, bookmarks]);

  return (
    <Container>
      <Collapsible collapsed={!clock}>
        <ProgressBar time={time} totalTime={testTime + readyTime} />
      </Collapsible>
      <Questions
        isTest={true}
        questNum={questNum}
        questData={questData[questNum]}
      />
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
        goToResult={goToResult}
        setModalVisible={setSubmitModalVisible}
      />
      <ModalAnsSheet
        inTest={true}
        answersheetModalVisible={answersheetModalVisible}
        setAnswersheetModalVisible={setAnswersheetModalVisible}
        studentAns={studentAns}
        bookmarks={bookmarks}
        time={readyTime + testTime - time}
        changeQuestNum={changeQuestNum}
        goToResult={goToResult}
        setSubmitModalVisible={setSubmitModalVisible}
      />
      <ModalSubmit
        modalVisible={submitModalVisible}
        setModalVisible={setSubmitModalVisible}
        goToResult={goToResult}
      />
    </Container>
  );
};
