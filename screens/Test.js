import React, { useLayoutEffect, useState } from "react";
import TestQuestions from "./TestQuestions";
import { StyleSheet, View, Button, SectionList, Text } from "react-native";
import styled from "styled-components/native";
import Book from "../assets/Svg/Book.svg";
import Profile from "../assets/Svg/Profile.svg";
import Collapsible from "react-native-collapsible";
import SelectMonth from "../components/SelectMonth";

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

const SectionContainer = styled.View`
  margin-vertical: 15px;
  justify-content: center;
  align-items: center;
  width: 95%;
`;

const SECTIONS = {
  2020: [3, 4, 5, 6, 8, 9, 10],
  2019: [3, 4, 5, 6, 8, 9, 10, 11],
  2018: [3, 4, 5, 6, 8, 9, 10, 11],
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
  const [part, setPart] = useState("liberal");
  const [selectedChap, setSelectedChap] = useState([]);
  const flatListItemSeparator = () => <View style={styles.separator} />;
  const [show, setShow] = useState({ 2020: true, 2019: true, 2018: true });
  const years = [2020, 2019, 2018];
  const [selectedMonth, setSelectedMonth] = useState(0);

  const changeShow = (year) => {
    const tmp = { ...show };
    tmp[year] = !tmp[year];
    setShow(tmp);
  };
  const goToTest = () => {
    navigation.navigate("모의시험 문제");
  };

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
      {SECTIONS[2018].map((month) => (
        <SectionContainer key={month}>
          <SelectMonth
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            year={2018}
            month={month}
            goToTest={goToTest}
          />
        </SectionContainer>
      ))}
    </Container>
    //   <View style={styles.container}>
    //     <View style={styles.areaSet}>
    //       <Button
    //         title="        문과        "
    //         color={part === "liberal" ? "blue" : "gray"}
    //         onPress={() => setPart("liberal")}
    //       />
    //       <Button
    //         title="        이과        "
    //         color={part === "natural" ? "blue" : "gray"}
    //         onPress={() => setPart("natural")}
    //       />
    //     </View>
    //     <View style={{ alignItems: "center", marginVertical: 10 }}>
    //       <SelectMonth
    //         selectedMonth={selectedMonth}
    //         setSelectedMonth={setSelectedMonth}
    //         year={2020}
    //         month={9}
    //       />
    //     </View>
    //     <View style={{ alignItems: "center", marginVertical: 10 }}>
    //       <SelectMonth
    //         selectedMonth={selectedMonth}
    //         setSelectedMonth={setSelectedMonth}
    //         year={2020}
    //         month={8}
    //       />
    //     </View>
    //     <View style={{ alignItems: "center", marginVertical: 10 }}>
    //       <SelectMonth
    //         selectedMonth={selectedMonth}
    //         setSelectedMonth={setSelectedMonth}
    //         year={2020}
    //         month={7}
    //       />
    //     </View>
    //     <View style={{ alignItems: "center", marginVertical: 10 }}>
    //       <SelectMonth
    //         selectedMonth={selectedMonth}
    //         setSelectedMonth={setSelectedMonth}
    //         year={2020}
    //         month={6}
    //       />
    //     </View>
    //     <View style={{ flex: 10 }}>
    //       <SectionList
    //         ItemSeparatorComponent={flatListItemSeparator}
    //         sections={years.map((year) => ({
    //           title: `${year}년`,
    //           data: testSet[year],
    //         }))}
    //         renderSectionHeader={({ section }) => (
    //           <Text
    //             style={styles.sectionHeaderStyle}
    //             onPress={() => {
    //               changeShow(section.title.substring(0, 4));
    //             }}
    //           >
    //             {section.title}{" "}
    //           </Text>
    //         )}
    //         renderItem={({ item }) => {
    //           return show[item.id.substring(0, 4)] ? (
    //             <Text
    //               style={styles.SectionListItemStyle}
    //               onPress={() => props.navigation.navigate("모의시험 문제")}
    //             >
    //               {item.value}
    //             </Text>
    //           ) : (
    //             <Text style={{ height: 0 }}></Text>
    //           );
    //         }}
    //         keyExtractor={(item, index) => index}
    //       />
    //     </View>
    //   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  areaSet: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "skyblue",
  },
  sectionHeaderStyle: {
    backgroundColor: "skyblue",
    fontSize: 20,
    paddingVertical: 5,
  },
  SectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: "#000",
  },
});
