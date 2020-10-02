import React, { useState, useEffect, useLayoutEffect } from "react";
import { BackHandler, ActivityIndicator, View, Text } from "react-native";
import QuestResult from "../components/QuestResult";
import ScrollContainer from "../components/ScrollContainer";
import ResultTable from "./../components/ResultTable";
import styled from "styled-components/native";
import { apiTestAns, apiTestSolutions } from "../api";
import Home from "../assets/Svg/Home.svg";
import { Feather } from "@expo/vector-icons";
import { screenInfo } from "../utils";

const { isTablet } = screenInfo;

const TitleContainer = styled.View`
  margin-left: -20px;
  justify-content: center;
`;

const HeaderLeftButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

const HeaderTitle = styled.Text`
  font-size: 23px;
  color: #4f62c0;
`;

const HeaderSubtitle = styled.Text`
  font-size: 15px;
  color: #999999;
`;

const HomeButton = styled.TouchableOpacity`
  margin-right: 25px;
`;

const Container = styled.View`
  padding-horizontal: 10px;
  background-color: white;
  flex: 1;
`;

export default (props) => {
  const { route, navigation } = props;
  const { time, studentAns, questData, bookmarks } = props.route.params;
  const [comments, setComments] = useState({
    loading: true,
    correctAns: {},
    solutions: {},
  });

  const getComments = async () => {
    const { correctAns } = await apiTestAns();
    const { solutionImageUrl: solutions } = await apiTestSolutions();
    setComments({
      loading: false,
      correctAns,
      solutions,
    });
  };
  const goToComment = (questNum) => {
    navigation.navigate("해설", {
      qNum: questNum,
      studentAns,
      questData,
      bookmarks,
      ...comments,
    });
  };
  // const popBefore = () => {
  //   navigation.pop(0);
  // };
  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", popBefore);
    getComments();
    // return () =>
    //   BackHandler.removeEventListener("hardwareBackPress", popBefore);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftButton onPress={() => navigation.pop(2)}>
          <Feather name="x" size={isTablet ? 34 : 24} color="#4F62C0" />
        </HeaderLeftButton>
      ),
      headerStyle: { backgroundColor: "white", height: 80, elevation: 0 },
      headerTitle: () => (
        <TitleContainer>
          <HeaderTitle>채점 결과</HeaderTitle>
          <HeaderSubtitle>2020년 7월 모의고사</HeaderSubtitle>
        </TitleContainer>
      ),
      headerRight: () => (
        <HomeButton onPress={() => navigation.popToTop()}>
          <Home width={28} height={28} />
        </HomeButton>
      ),
    });
  }, [route]);

  return comments.loading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator color="#4f62c0" size="large" />
      <Text style={{ fontSize: 30 }}> 채점중 </Text>
    </View>
  ) : (
    <Container>
      <ResultTable
        time={time}
        studentAns={studentAns}
        correctAns={comments.correctAns}
      />
      <View>
        <View
          style={{
            alignSelf: "center",
            position: "absolute",
            borderBottomColor: "#95989A",
            borderBottomWidth: 3,
            height: "50%",
            width: "100%",
          }}
        />
        <Text
          style={{
            alignSelf: "center",
            paddingHorizontal: 10,
            backgroundColor: "white",
            color: "#4F62C0",
          }}
        >
          풀이 결과
        </Text>
      </View>

      <ScrollContainer>
        {[...Array(30)]
          .map((x, i) => i + 1)
          .map((n) => (
            <QuestResult
              key={n}
              questNum={n}
              studentAns={studentAns[n]}
              correctAns={comments.correctAns[n]}
              goToComment={goToComment}
            />
          ))}
      </ScrollContainer>
    </Container>
  );
};
