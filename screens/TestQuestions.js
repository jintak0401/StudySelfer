import React, { useState, useEffect, useLayoutEffect } from "react";
import Questions from "../components/Questions";
import { apiGetTest } from "./../api";
import ProgressBar from "../components/TestQuestions/ProgressBar";
import styled from "styled-components/native";
import TestAdditionalFunc from "./../components/TestAdditionalFunc";
import Ansbtn from "../components/TestQuestions/Ansbtn";
import Input from "../components/TestQuestions/Input";
import MoveQuestBtn from "./../components/MoveQuestBtn";
import ModalAnsSheet from "./../components/ModalAnsSheet";
import Collapsible from "react-native-collapsible";
import ModalSubmit from "../components/TestQuestions/ModalSubmit";
import ScrollContainer from "../components/ScrollContainer";

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
  align-items: center;
  height: 70px;
`;

const InputContainer = styled.View`
  align-items: center;
`;

const HeaderImage = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 3.987;
  position: absolute;
  top: 0;
`;

export default ({ navigation, route }) => {
  const [questNum, setQuestNum] = useState(1);
  const [studentAns, setStudentAns] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [questData, setQuestData] = useState({});
  const [testTime, readyTime] = [6000, 0];
  const [time, setTime] = useState(testTime + readyTime);
  const [clock, setClock] = useState(false);
  const [answersheetModalVisible, setAnswersheetModalVisible] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [moveActive, setMoveActive] = useState(true);
  const [removedAns, setRemovedAns] = useState({});
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);

  const removingAns = (ans) => {
    const tmp = { ...removedAns };
    if (!(questNum in tmp)) tmp[questNum] = {};
    const alreadyRemoved = tmp[questNum][ans];
    tmp[questNum][ans] = !alreadyRemoved;
    setRemovedAns({ ...tmp });
  };

  const getQuestData = async () => {
    const tmp = await apiGetTest(route.params.subtitle);
    setData(tmp);
    setLoad(true);
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
      studentAns,
      bookmarks,
      ...data,
    });
  };

  useEffect(() => {
    getQuestData();
  }, []);
  useEffect(() => {
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
      headerTransparent: true,
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
      {load ? (
        <>
          <Collapsible collapsed={!clock}>
            <ProgressBar time={time} totalTime={testTime + readyTime} />
          </Collapsible>
          <ScrollContainer isQuest={true} flexValue={6}>
            <Questions
              questNum={questNum}
              questData={data.questionImageUrl[questNum]}
            />
          </ScrollContainer>
          {questNum <= 21 ? (
            <AnsbtnSet>
              {[1, 2, 3, 4, 5].map((n) => (
                <Ansbtn
                  key={n}
                  ansNum={n}
                  isSelected={studentAns[questNum] === n}
                  selectAns={selectAns}
                  isRemoved={removedAns[questNum]?.[n]}
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
          {moveActive ? (
            <MoveQuestBtn
              inTest={true}
              questNum={questNum}
              changeQuestNum={changeQuestNum}
              time={readyTime + testTime - time}
              goToResult={goToResult}
              setModalVisible={setSubmitModalVisible}
            />
          ) : null}
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
        </>
      ) : null}
      <HeaderImage
        source={require("../assets/Png/HeaderBackRect.png")}
      ></HeaderImage>
    </Container>
  );
};
