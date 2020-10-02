import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components/native";
import { screenInfo } from "../utils";
import StepUp from "../assets/Svg/StepUp.svg";
import NoteAndPerson from "../assets/Svg/NoteAndPerson.svg";
import TestingPeople from "../assets/Svg/TestingPeople.svg";
import Book from "../assets/Svg/Book.svg";
import Profile from "../assets/Svg/Profile.svg";

const { isTablet, WIDTH, HEIGHT } = screenInfo;

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
`;

const ProfileButton = styled.TouchableOpacity`
  margin-right: 20px;
  margin-top: 40px;
`;

// elevation => for Android
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
  font-size: 20px;
  color: #4f62c0;
`;

export default ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Book marginLeft={30} width={50} height={50} />,
      headerStyle: { backgroundColor: "#4F62C0", height: 100 },
      headerTitle: () => <HeaderTitle>수학노트</HeaderTitle>,
      headerRight: () => (
        <ProfileButton>
          <Profile width={30} height={30} />
        </ProfileButton>
      ),
    });
  }, [route]);

  return (
    <Container>
      <Button onPress={() => navigation.navigate("진단평가")}>
        <StepUp width={100} height={100} />
        <Text>진단평가</Text>
      </Button>
      <Button onPress={() => navigation.navigate("추천문제")}>
        <NoteAndPerson width={117.71} height={100} />
        <Text>추천문제</Text>
      </Button>
      <Button onPress={() => navigation.navigate("모의수능 및 모의고사")}>
        <TestingPeople width={97.76} height={100} />
        <Text>모의고사</Text>
      </Button>
    </Container>
  );
};
