import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import StepUp from "../assets/Svg/StepUp.svg";
import NoteAndPerson from "../assets/Svg/NoteAndPerson.svg";
import TestingPeople from "../assets/Svg/TestingPeople.svg";
import Book from "../assets/Svg/Book.svg";
import Profile from "../assets/Svg/Profile.svg";
import { ToastAndroid } from "react-native";
import { apiGetRecommendNode } from "../api";
import { solvedData } from "../solvedData";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding-horizontal: 20px;
  background-color: white;
`;

const HeaderTitle = styled.Text`
  font-size: 30px;
  color: white;
  margin-top: 25px;
  margin-left: 20px;
  font-family: Ssangmoon;
`;

const ProfileButton = styled.TouchableOpacity`
  margin-right: 20px;
  margin-top: 40px;
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-horizontal: 10px;
  margin: 10px;
  padding: 20px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: #bce0fd;
  elevation: 7;
`;

const Text = styled.Text`
  font-size: 23px;
  color: #4f62c0;
  font-family: Ssangmoon;
  padding-right: 5px;
`;

export default ({ navigation, route }) => {
  const loaded = true;
  const msg = "먼저 진단평가를 봐주세요!";

  const getData = async () => {
    const data = await apiGetRecommendNode();
    return data;
  };

  const goToRecommend = async () => {
    const data = await apiGetRecommendNode();
    console.log("Init.js", data);
    navigation.navigate("추천", {
      ...data,
    });
  };

  const showMsg = () => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Book marginLeft={30} width={50} height={50} />,
      headerStyle: { backgroundColor: "#4F62C0", height: 100 },
      headerTitle: () => <HeaderTitle>수학노트</HeaderTitle>,
      headerRight: () => (
        <ProfileButton onPress={() => navigation.openDrawer()}>
          <Profile width={30} height={30} />
        </ProfileButton>
      ),
    });
  }, [route]);

  return loaded ? (
    <Container>
      <Button
        activeOpacity={0.8}
        onPress={() => navigation.navigate("진단평가")}
      >
        <StepUp width={100} height={100} />
        <Text>진단평가</Text>
      </Button>
      <Button
        activeOpacity={0.8}
        onPress={() => {
          solvedData.diagnose ? goToRecommend() : showMsg();
        }}
      >
        <NoteAndPerson width={117.71} height={100} />
        <Text>추천문제</Text>
      </Button>
      <Button
        activeOpacity={0.8}
        onPress={() =>
          solvedData.diagnose
            ? navigation.navigate("모의수능 및 모의고사")
            : showMsg()
        }
      >
        <TestingPeople width={97.76} height={100} />
        <Text>모의고사</Text>
      </Button>
    </Container>
  ) : null;
};
