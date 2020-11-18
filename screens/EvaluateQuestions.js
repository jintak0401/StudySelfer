import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { apiPostEvaluation } from "../api";
import Questions from "../components/Questions";
import Ansbtn from "../components/TestQuestions/Ansbtn";
import Input from "../components/TestQuestions/Input";
import ScrollContainer from "../components/ScrollContainer";
import Timer from "../components/Timer";
import NextAndDontKnow from "../components/NextAndDontKnow";
import { solvedData } from "../solvedData";
import { BackMarkWhite } from "../assets/Svg";
import colorset from "../colorset";

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

const HeaderImage = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 3.987;
  position: absolute;
  top: 0;
`;

const LoadingImage = styled.Image`
  position: absolute;
  align-self: center;
  z-index: 1;
  top: 50%;
  width: 50px;
  height: 50px;
`;

const EvaluateQuestions = (props) => {
  const { route, navigation } = props;
  const {
    questionImageUrl: quest,
    solutionImageUrl: solution,
    isChoice: _isChoice,
    correctAns: _correctAns,
    id: qid,
  } = props.route.params;
  const [showBottom, setShowBottom] = useState(true);
  const [quests, setQuests] = useState({ 1: quest });
  const [solutions, setSolutions] = useState({ 1: solution });
  const [questNum, setQuestNum] = useState(1);
  const [time, setTime] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [removedAns, setRemovedAns] = useState({});
  const [isChoiceProb, setIsChoiceProb] = useState(_isChoice);
  const [questData, setQuestData] = useState(quest);
  const [dontKnow, setDontKnow] = useState(false);
  const [studentAns, setStudentAns] = useState({});
  const [isChoice, setIsChoice] = useState({ 1: _isChoice });
  const [correctAns, setCorrectAns] = useState({ 1: _correctAns });
  const [id, setId] = useState(qid);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const initAns = () => {
    setTime(0);
    setAnswer(0);
    setRemovedAns({});
  };

  const selectAns = (num) => {
    if (isChoiceProb) setAnswer((prev) => (prev === num ? 0 : num));
    else setAnswer(num);
  };

  const goToEvaluateSolution = (data) => {
    solvedData.diagnose = true;
    navigation.navigate("새 진단평가결과", {
      studentAns: studentAns,
      quests: quests,
      solutions: solutions,
      correctAns: correctAns,
      isChoice: isChoice,
      ...data,
    });
  };

  const BridgeEvaluation = (data) => {
    setDone(true);
    setTimeout(
      () => goToEvaluateSolution(data),
      parseInt(2000 + Math.random() * 200)
    );
  };

  const goToNext = () => {
    setStudentAns({ ...studentAns, [questNum]: answer });
  };

  useEffect(() => {
    const postAnswer = async () => {
      const data = await apiPostEvaluation(
        removedAns,
        time,
        studentAns[questNum],
        id
      );
      // 진단이 끝난 경우
      if (data.good) {
        // goToEvaluateSolution(data)
        BridgeEvaluation(data);
      }
      // 진단이 아직 안 끝난 경우
      else {
        const {
          questionImageUrl,
          solutionImageUrl: solution,
          isChoice: _isChoice,
          correctAns: _correctAns,
          id: _qid,
        } = data;
        setSolutions({ ...solutions, [questNum + 1]: solution });
        setIsChoice({ ...isChoice, [questNum + 1]: _isChoice });
        setCorrectAns({ ...correctAns, [questNum + 1]: _correctAns });
        setId(_qid);
        setQuests({
          ...quests,
          [questNum + 1]: questionImageUrl,
        });
        setQuestData(questionImageUrl);
        setIsChoiceProb(_isChoice);
        setTime(0);
        initAns();
        setDontKnow(false);
        setQuestNum((prev) => prev + 1);
      }
    };
    if (Object.keys(studentAns).length != 0) postAnswer();
  }, [studentAns]);

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
      headerTransparent: true,
      headerLeft: () => (
        <BackMarkWhite
          width={20}
          height={20}
          style={{ marginLeft: 20 }}
          onPress={() => navigation.pop(1)}
        />
      ),
      headerTitle: () => (
        <TitleContainer>
          <HeaderTitle>진단평가</HeaderTitle>
          <HeaderSubtitle>{questNum}번 문제</HeaderSubtitle>
        </TitleContainer>
      ),
      headerRight: () => (
        <TimeContainer>
          <Timer time={time} />
        </TimeContainer>
      ),
    });
  }, [route, questNum, time]);

  return (
    <Container>
      {loading ? (
        <>
          <LoadingImage source={require("../assets/Gif/LoadingGIF.gif")} />
          {done && (
            <Text
              style={{
                position: "absolute",
                top: "60%",
                alignSelf: "center",
                color: colorset.lightBlue,
                fontSize: 24,
                fontFamily: "HGG60",
              }}
            >
              진단평가 결과를 분석중이에요!
            </Text>
          )}
        </>
      ) : (
        !done && (
          <>
            <ScrollContainer
              isQuest={true}
              flexValue={6}
              ListFooterComponent={() => (
                <View style={{ height: 70, backgroundColor: "white" }} />
              )}
            >
              <Questions questData={questData} />
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
            </BottomContainer>
            {showBottom ? (
              <NextAndDontKnow
                goToNext={() => {
                  setLoading(true);
                  goToNext();
                  setTimeout(() => {
                    setLoading(false);
                  }, parseInt(Math.random() * 100 + 1500));
                }}
                // goToNext={goToNext}
                dontKnow={dontKnow}
                setDontKnow={setDontKnow}
              />
            ) : null}
          </>
        )
      )}
      <HeaderImage
        source={require("../assets/Png/HeaderBackRect.png")}
      ></HeaderImage>
    </Container>
  );
};

export default EvaluateQuestions;
