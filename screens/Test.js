import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, Button, SectionList, Text } from "react-native";
import styled from "styled-components/native";
import Profile from "../assets/Svg/Profile.svg";
import { getTestTitle } from "../utils";
import ScrollContainer from "./../components/ScrollContainer";
import BackMark from "../assets/Svg/BackMark.svg";
import { resetSolvedData } from "../solvedData";
import {
  ModalModeSelect,
  ModalRestudy,
  SelectMonth,
  SelectTest,
  SelectYear,
} from "../components/Test";
import { testInfo } from "../testInfo";

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

const SelectYearMonthContainer = styled.View`
  flex: 7.6;
  width: 100%;
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
  margin-left: 10px;
`;

const SelectedYearContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 0.6;
  width: 85%;
  margin-left: 10px;
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

const EmptyBox = styled.View`
  height: 30px;
`;

export default (props) => {
  const { navigation, route } = props;
  const flatListItemSeparator = () => <View style={styles.separator} />;
  const [show, setShow] = useState({ 2020: true, 2019: true, 2018: true });
  const years = [2020, 2019, 2018];
  const [selectedYear, setSelectedYear] = useState(0);
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
      year: selectedYear,
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
      <SelectTest
        selectedTest={selectedTest}
        setSelectedTest={setSelectedTest}
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
        setSelectedYear={setSelectedYear}
      />
      <SelectYearMonthContainer>
        {selectedYear === 0 && selectedTest === "mockTest" ? (
          <>
            <EmptyBox />
            <ListContainer>
              {Object.keys(testInfo.mockTest).map((year, idx) => (
                <SectionContainer key={parseInt(year)}>
                  <SelectYear
                    year={parseInt(year)}
                    setSelectedYear={setSelectedYear}
                    needMarginTop={idx === 0}
                  />
                </SectionContainer>
              ))}
            </ListContainer>
          </>
        ) : null}
        {selectedYear !== 0 && selectedTest === "mockTest" ? (
          <>
            <SelectedYearContainer>
              <BackButton
                onPress={() => {
                  setSelectedYear(0);
                  setSelectedMonth(0);
                }}
              >
                <BackMark width={18} height={18} />
              </BackButton>
              <SelectedYearText>{selectedYear}년 모의고사</SelectedYearText>
            </SelectedYearContainer>
            <ListContainer>
              {testInfo.mockTest[selectedYear].map((month) => (
                <SectionContainer key={month}>
                  <SelectMonth
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    setSelectedMonth={setSelectedMonth}
                    setSelectedYear={setSelectedYear}
                    setRestudyModalVisible={setRestudyModalVisible}
                    setModeModalVisible={setModeModalVisible}
                    year={selectedYear}
                    month={month}
                  />
                </SectionContainer>
              ))}
            </ListContainer>
          </>
        ) : null}
        {selectedTest === "sat" ? (
          <>
            <EmptyBox />
            <ListContainer>
              {testInfo.sat.map((year) => (
                <SectionContainer key={year}>
                  <SelectMonth
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    setSelectedMonth={setSelectedMonth}
                    setSelectedYear={setSelectedYear}
                    setRestudyModalVisible={setRestudyModalVisible}
                    setModeModalVisible={setModeModalVisible}
                    year={year}
                    month={11}
                  />
                </SectionContainer>
              ))}
            </ListContainer>
          </>
        ) : null}
      </SelectYearMonthContainer>
      <Button
        title="RESET"
        onPress={() => {
          resetSolvedData();
          setSelectedMonth(100);
        }}
      />
      <ModalRestudy
        restudyModalVisible={restudyModalVisible}
        setRestudyModalVisible={setRestudyModalVisible}
        setModeModalVisible={setModeModalVisible}
        setSelectedMonth={setSelectedMonth}
      />
      <ModalModeSelect
        modalVisible={modeModalVisible}
        setModalVisible={setModeModalVisible}
        goToTest={goToTest}
        title={getTestTitle(selectedYear, selectedMonth)}
        setSelectedMonth={setSelectedMonth}
      />
    </Container>
  );
};
