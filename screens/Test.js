import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import TestQuestions from "./TestQuestions";
import { StyleSheet, View, Button, SectionList, Text } from "react-native";
import Progress from "react-native-progress";

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
  const [part, setPart] = useState("liberal");
  const [selectedChap, setSelectedChap] = useState([]);
  const flatListItemSeparator = () => <View style={styles.separator} />;
  const [show, setShow] = useState({ 2020: true, 2019: true, 2018: true });

  const changeShow = (year) => {
    const tmp = { ...show };
    tmp[year] = !tmp[year];
    setShow(tmp);
  };

  const years = [2020, 2019, 2018];

  return (
    <View style={styles.container}>
      <View style={styles.areaSet}>
        <Button
          title="        문과        "
          color={part === "liberal" ? "blue" : "gray"}
          onPress={() => setPart("liberal")}
        />
        <Button
          title="        이과        "
          color={part === "natural" ? "blue" : "gray"}
          onPress={() => setPart("natural")}
        />
      </View>
      <View style={{ flex: 10 }}>
        <SectionList
          ItemSeparatorComponent={flatListItemSeparator}
          sections={years.map((year) => ({
            title: `${year}년`,
            data: testSet[year],
          }))}
          renderSectionHeader={({ section }) => (
            <Text
              style={styles.sectionHeaderStyle}
              onPress={() => {
                changeShow(section.title.substring(0, 4));
              }}
            >
              {section.title}{" "}
            </Text>
          )}
          renderItem={({ item }) => {
            return show[item.id.substring(0, 4)] ? (
              <Text
                style={styles.SectionListItemStyle}
                onPress={() => props.navigation.navigate("모의시험 문제")}
              >
                {item.value}
              </Text>
            ) : (
              <Text style={{ height: 0 }}></Text>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

// export default ({ navigation }) => (
//   <View>
//     <Button
//       title="문제풀기"
//       onPress={() => navigation.navigate("모의시험 문제")}
//     />
//   </View>
// );
