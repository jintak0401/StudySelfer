import React, { useLayoutEffect, useEffect, useState } from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Questions from "../components/Questions";
import ScrollContainer from "../components/ScrollContainer";
import MoveQuestBtn from "./../components/MoveQuestBtn";
import Home from "../assets/Svg/Home.svg";
import QuestSummary from "../components/QuestComment/QuestSummary";
import Collapsible from "react-native-collapsible";
import Dash from "react-native-dash";
import { AntDesign } from "@expo/vector-icons";
import Solutions from "../components/Solutions";
import colorset from "../colorset";
import { BackMarkWhite } from "../assets/Svg";

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

const HeaderLeftButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

const IconSet = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 20px;
  margin-top: 10px;
`;

const HomeButton = styled.TouchableOpacity`
  margin-right: 25px;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
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
  padding-left: 6px;
  font-family: HGG60;
`;

const FoldDirection = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const HeaderImage = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 3.987;
  position: absolute;
  top: 0;
`;

export default (props) => {
  const { navigation, route } = props;
  const {
    qNum,
    studentAns,
    correctAns,
    questData,
    solutions,
    endQuestionNum,
    isChoice,
  } = props.route.params;
  const [questNum, setQuestNum] = useState(qNum);
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
      // headerStyle: {
      //   backgroundColor: "white",
      //   height: 80,
      //   elevation: 1,
      //   borderBottomWidth: 3,
      //   borderColor: "#95989A",
      // },

      headerStyle: { backgroundColor: "white", height: 80, elevation: 0 },
      headerTransparent: true,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.pop(1);
          }}
        >
          <BackMarkWhite width={20} height={20} style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <TitleContainer>
          <HeaderTitle>해설 보기</HeaderTitle>
          <HeaderSubtitle>
            {/*"진단 평가"*/ "추천문제"} {questNum}번 문제
          </HeaderSubtitle>
        </TitleContainer>
      ),
      headerRight: () => (
        <HomeButton onPress={() => navigation.pop(3)}>
          <Home width={28} height={28} />
        </HomeButton>
      ),
    });
  }, [route, questNum]);

  return (
    <Container>
      <QuestSummary
        questNum={questNum}
        studentAns={studentAns[questNum]}
        correctAns={correctAns[questNum]}
        isChoice={isChoice?.[questNum]}
        needMargin={true}
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
            <Questions questData={questData[questNum].questImageUrl} />
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
            <Solutions solutionImageUrl={solutions[questNum]} />
          </Collapsible>
        </Wrapper>
      </ScrollContainer>
      <MoveQuestBtn
        inTest={false}
        questNum={questNum}
        changeQuestNum={(qNum) => setQuestNum(qNum)}
        endQuestionNum={endQuestionNum}
      />
      <HeaderImage
        source={require("../assets/Png/HeaderBackRect.png")}
      ></HeaderImage>
    </Container>
  );
};
