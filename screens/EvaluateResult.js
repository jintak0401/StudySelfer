import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import Home from "../assets/Svg/Home.svg";
import { Feather } from "@expo/vector-icons";
import { screenInfo } from "../utils";

const { isTablet } = screenInfo;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Rank = styled.Text`
  flex: 1;
  text-align-vertical: center;
  text-align: center;
`;

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

const correctAns = {
  1: 5,
  2: 4,
  3: 1,
  4: 2,
  5: 3,
  6: 1,
  7: 4,
  8: 1,
  9: 5,
  10: 2,
};

const EvaluateResult = ({ navigation, route }) => {
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
          <HeaderTitle>진단 결과</HeaderTitle>
          <HeaderSubtitle>1회차</HeaderSubtitle>
        </TitleContainer>
      ),
      headerRight: () => (
        <HomeButton onPress={() => navigation.popToTop()}>
          <Home width={28} height={28} />
        </HomeButton>
      ),
    });
  }, [route]);
  return <Rank>2등급</Rank>;
};

export default EvaluateResult;
