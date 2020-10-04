import React, { useLayoutEffect, useEffect, useState } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import Questions from "../components/Questions";
import ScrollContainer from "../components/ScrollContainer";
import MoveQuestBtn from "./../components/MoveQuestBtn";
import ModalAnsSheet from "./../components/ModalAnsSheet";
import Home from "../assets/Svg/Home.svg";
import TestAdditionalFunc from "../components/TestAdditionalFunc";
import QuestSummary from "../components/QuestComment/QuestSummary";
import { screenInfo } from "../utils";
import Collapsible from "react-native-collapsible";
import Dash from "react-native-dash";
import { AntDesign } from "@expo/vector-icons";

const { isTablet, WIDTH, HEIGHT } = screenInfo;

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

const HomeButton = styled.TouchableOpacity`
  margin-right: 15px;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const AnswersContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  margin-vertical: 10px;
`;

const CollapseButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 65px;
  background-color: white;
  margin-bottom: 20px;
  ${(props) => props.isSolution && `margin-top: 20px`};
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

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export default (props) => {
  const { navigation, route } = props;
  const {
    qNum,
    studentAns,
    correctAns,
    questData,
    bookmarks,
    solutions,
  } = props.route.params;
  const [questNum, setQuestNum] = useState(qNum);
  const [modalVisible, setModalVisible] = useState(false);
  const setModal = (n) => setModalVisible(!modalVisible);
  const [questCollapsed, setQuestCollapsed] = useState(false);
  const [solutionCollapsed, setSolutionCollapsed] = useState(false);
  const [questDirection, setQuestDirection] = useState(new Animated.Value(0));
  const [solutionDirection, setSolutionDirection] = useState(
    new Animated.Value(0)
  );
  const questRotate = questDirection.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const solutionRotate = solutionDirection.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const [questRatio, setQuestRatio] = useState(1);
  const [solutionRatio, setSolutionRatio] = useState(1);
  useLayoutEffect(() => {
    if (solutions) {
      Image.getSize(solutions[questNum], (width, height) => {
        setSolutionRatio(width / height);
      });
    }
  }, [questNum]);
  useLayoutEffect(() => {
    if (questData) {
      Image.getSize(questData[questNum].questImageUrl, (width, height) => {
        setQuestRatio(width / height);
      });
    }
  }, [questNum]);
  useEffect(() => {
    setQuestCollapsed(false);
    setSolutionCollapsed(false);
  }, [questNum]);

  useEffect(() => {
    Animated.timing(questDirection, {
      toValue: questCollapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.easeInOutCubic,
    }).start();
  }, [questCollapsed]);
  useEffect(() => {
    Animated.timing(solutionDirection, {
      toValue: solutionCollapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [solutionCollapsed]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "white",
        height: 80,
        elevation: 1,
        borderBottomWidth: 3,
        borderColor: "#95989A",
      },
      headerTitle: () => (
        <TitleContainer>
          <HeaderTitle>해설 보기</HeaderTitle>
          <HeaderSubtitle>2020년 7월 모의고사</HeaderSubtitle>
        </TitleContainer>
      ),
      headerRight: () => (
        <IconSet>
          <HomeButton onPress={() => navigation.popToTop()}>
            <Home width={28} height={28} />
          </HomeButton>
          <TestAdditionalFunc
            funcName="subtitles"
            setActive={setModal}
            questNum={questNum}
          />
        </IconSet>
      ),
    });
  }, [route]);

  return (
    <Container>
      <ModalAnsSheet
        inTest={false}
        answersheetModalVisible={modalVisible}
        setAnswersheetModalVisible={setModalVisible}
        studentAns={studentAns}
        correctAns={correctAns}
        bookmarks={bookmarks}
        time={300}
        changeQuestNum={(n) => setQuestNum(n)}
      />
      <QuestSummary
        questNum={questNum}
        studentAns={studentAns[questNum]}
        correctAns={correctAns[questNum]}
        isChoice={questNum <= 21}
      />
      <ScrollContainer>
        <Wrapper>
          <Dash
            style={{
              position: "absolute",
              top: 10,
              width: 360,
              height: 1,
            }}
            dashGap={3}
            dashLength={5}
            dashThickness={1}
            dashColor={"#999999"}
          />
          <CollapseButton
            activeOpacity={1}
            onPress={() => setQuestCollapsed(!questCollapsed)}
          >
            <CollapseText>문제</CollapseText>
            <FoldDirection style={{ transform: [{ rotate: questRotate }] }}>
              <AntDesign name="up" size={20} color="#4F62C0" />
            </FoldDirection>
          </CollapseButton>
          <Collapsible collapsed={questCollapsed}>
            <Image
              style={{
                width: WIDTH * 0.9,
                height: undefined,
                aspectRatio: questRatio,
              }}
              source={{ uri: questData[questNum].questImageUrl }}
              resizeMode="cover"
            />
          </Collapsible>
        </Wrapper>
        <Wrapper>
          <Dash
            style={{
              position: "relative",
              width: 360,
              height: 1,
              top: 32,
            }}
            dashGap={3}
            dashLength={5}
            dashThickness={1}
            dashColor={"#999999"}
          />
          <CollapseButton
            isSolution={true}
            activeOpacity={1}
            onPress={() => setSolutionCollapsed(!solutionCollapsed)}
          >
            <CollapseText>해설</CollapseText>
            <FoldDirection style={{ transform: [{ rotate: solutionRotate }] }}>
              <AntDesign name="up" size={20} color="#4F62C0" />
            </FoldDirection>
          </CollapseButton>
          <Collapsible collapsed={solutionCollapsed}>
            <Image
              style={{
                width: WIDTH * 0.9,
                height: undefined,
                aspectRatio: solutionRatio,
              }}
              source={{ uri: solutions[questNum] }}
              resizeMode="cover"
            />
          </Collapsible>
        </Wrapper>
      </ScrollContainer>
      <MoveQuestBtn
        inTest={false}
        questNum={questNum}
        changeQuestNum={(qNum) => setQuestNum(qNum)}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    borderBottomWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
