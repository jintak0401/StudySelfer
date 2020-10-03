import React, { useEffect, useLayoutEffect, useState } from "react";
import TestQuestions from "./TestQuestions";
import { StyleSheet, View, Button, SectionList, Text } from "react-native";
import styled from "styled-components/native";
import Book from "../assets/Svg/Book.svg";
import Profile from "../assets/Svg/Profile.svg";
import Collapsible from "react-native-collapsible";
import SelectMonth from "../components/SelectMonth";
import ModalRestudy from "../components/ModalRestudy";
import ModalModeSelect from "../components/ModalModeSelect";
import { getTestTitle } from "../utils";
import ScrollContainer from "./../components/ScrollContainer";
import BackMark from "../assets/Svg/BackMark.svg";
import { resetSolvedData } from "../solvedData";

const BookButton = styled.TouchableOpacity`
  margin-left: 30px;
`;

const HeaderTitle = styled.Text`
  font-size: 26px;
  color: white;
  margin-left: -15px;
`;

const ProfileButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.View`
  flex: 7;
  width: 100%;
`;

const SectionContainer = styled.View`
  margin-vertical: 15px;
  justify-content: center;
  align-items: center;
  width: 95%;
`;

const TestSelectContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const TestSelectButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: ${(props) => (props.isSelected ? "#4F62C0" : "#CCCCCC")};
  margin-horizontal: 20px;
  width: 130px;
  height: 35px;
`;

const TestSelectText = styled.Text`
  font-size: 13px;
  color: white;
  font-family: NanumSquare;
  font-weight: bold;
`;

const SelectedYearContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 0.6;
  width: 85%;
`;

const BackButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const SelectedYearText = styled.Text`
  color: #4f62c0;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-bottom: 3px;
`;

const SECTIONS = {
  2020: [3, 4, 5, 6, 8, 9, 10],
  2019: [3, 4, 5, 6, 8, 9, 10, 11],
  2018: [3, 4, 6, 7, 9, 10],
};

const testSet = {
  2020: [
    { id: "2020_9", value: "9월 평가원 모의고사" },
    { id: "2020_8", value: "8월 교육청 모의고사" },
    { id: "2020_6", value: "6월 평가원 모의고사" },
    { id: "2020_5", value: "5월 교육청 모의고사" },
    { id: "2020_4", value: "4월 교육청 모의고사" },
    { id: "2020_3", value: "3월 교육청 모의고사" },
  ],
  2019: [
    { id: "2019_11", value: "20학년도 수능" },
    { id: "2019_10", value: "10월 교육청 모의고사" },
    { id: "2019_9", value: "9월 평가원 모의고사" },
    { id: "2019_8", value: "8월 교육청 모의고사" },
    { id: "2019_6", value: "6월 평가원 모의고사" },
    { id: "2019_5", value: "5월 교육청 모의고사" },
    { id: "2019_4", value: "4월 교육청 모의고사" },
    { id: "2019_3", value: "3월 교육청 모의고사" },
  ],
  2018: [
    { id: "2018_11", value: "19학년도 수능" },
    { id: "2018_10", value: "10월 교육청 모의고사" },
    { id: "2018_9", value: "9월 평가원 모의고사" },
    { id: "2018_8", value: "8월 교육청 모의고사" },
    { id: "2018_6", value: "6월 평가원 모의고사" },
    { id: "2018_5", value: "5월 교육청 모의고사" },
    { id: "2018_4", value: "4월 교육청 모의고사" },
    { id: "2018_3", value: "3월 교육청 모의고사" },
  ],
};

export default (props) => {
  const { navigation, route } = props;
  const flatListItemSeparator = () => <View style={styles.separator} />;
  const [show, setShow] = useState({ 2020: true, 2019: true, 2018: true });
  const years = [2020, 2019, 2018];
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [restudyModalVisible, setRestudyModalVisible] = useState(false);
  const [modeModalVisible, setModeModalVisible] = useState(false);
  const [selectedTest, setSelectedTest] = useState(undefined);

  const changeShow = (year) => {
    const tmp = { ...show };
    tmp[year] = !tmp[year];
    setShow(tmp);
  };
  const goToTest = (title) => {
    navigation.navigate("모의시험 문제", {
      subtitle: title,
      year: 2018,
      month: selectedMonth,
    });
  };
  useEffect(() => {
    const refresh = navigation.addListener("focus", () => {
      const tmpMonth = selectedMonth;
      setSelectedMonth(0);
    });
    return refresh;
  }, [navigation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "white",
      headerStyle: { backgroundColor: "#4F62C0", height: 60 },
      headerTitle: () => <HeaderTitle>모의고사</HeaderTitle>,
      headerRight: () => (
        <ProfileButton>
          <Profile width={30} height={30} />
        </ProfileButton>
      ),
    });
  }, [route]);

  return (
    <Container>
      <TestSelectContainer>
        <TestSelectButton
          isSelected={selectedTest === "mockTest"}
          onPress={() => setSelectedTest("mockTest")}
        >
          <TestSelectText>기출 모의고사</TestSelectText>
        </TestSelectButton>
        <TestSelectButton
          isSelected={selectedTest === "sat"}
          onPress={() => setSelectedTest("sat")}
        >
          <TestSelectText>대학 수학 능력시험</TestSelectText>
        </TestSelectButton>
      </TestSelectContainer>
      <SelectedYearContainer>
        <BackButton>
          <BackMark width={18} height={18} />
        </BackButton>
        <SelectedYearText>2018년 모의고사</SelectedYearText>
      </SelectedYearContainer>
      <ListContainer>
        {/* <ScrollContainer> */}
        {SECTIONS[2018].map((month) => (
          <SectionContainer key={month}>
            <SelectMonth
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              setRestudyModalVisible={setRestudyModalVisible}
              setModeModalVisible={setModeModalVisible}
              year={2018}
              month={month}
            />
          </SectionContainer>
        ))}
        <ModalRestudy
          restudyModalVisible={restudyModalVisible}
          setRestudyModalVisible={setRestudyModalVisible}
          setModeModalVisible={setModeModalVisible}
        />
        <ModalModeSelect
          modalVisible={modeModalVisible}
          setModalVisible={setModeModalVisible}
          goToTest={goToTest}
          title={getTestTitle(2018, selectedMonth)}
        />
        {/* </ScrollContainer> */}
      </ListContainer>
      <Button
        title="RESET"
        onPress={() => {
          resetSolvedData();
          setSelectedMonth(100);
        }}
      />
    </Container>
  );
};
