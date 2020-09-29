import React, { useState } from "react";
import { StyleSheet, View, Button, SectionList, Text } from "react-native";

const chapters = {
  math1: [
    { id: "math1_1", value: "지수함수와 로그함수" },
    { id: "math1_2", value: "삼각함수" },
    { id: "math1_3", value: "수열" },
  ],
  math2: [
    { id: "math2_1", value: "수열의 극한" },
    { id: "math2_2", value: "미분법" },
    { id: "math2_3", value: "적분법" },
  ],
  calculus: [
    { id: "calculus_1", value: "함수의 극한" },
    { id: "calculus_2", value: "미분법" },
    { id: "calculus_3", value: "적분법" },
  ],
  statistic: [
    { id: "statistic_1", value: "순열과 조합" },
    { id: "statistic_2", value: "확률" },
    { id: "statistic_3", value: "통계" },
  ],
};

const area = {
  liberal: [
    ["math1", "수학 I"],
    ["math2", "수학 II"],
    ["statistic", "확률과 통계"],
  ],
  natural: [
    ["math1", "수학 I"],
    ["calculus", "미적분"],
    ["statistic", "확률과 통계"],
  ],
};

export default (props) => {
  const [part, setPart] = useState("liberal");
  const [selectedChap, setSelectedChap] = useState([]);
  const flatListItemSeparator = () => <View style={styles.separator} />;

  const [show, setShow] = useState(true);

  const changePart = (after) => {
    setPart(after);
  };

  const choiceChap = (chap) => {
    const tmp = { ...selectedChap };
    if (tmp[chap] === undefined) tmp[chap] = false;
    tmp[chap] = !tmp[chap];
    setSelectedChap({ ...tmp });
  };

  return (
    <View style={styles.container}>
      <View style={styles.areaSet}>
        <Button
          title="        문과        "
          color={part === "liberal" ? "blue" : "gray"}
          onPress={() => changePart("liberal")}
        />
        <Button
          title="        이과        "
          color={part === "natural" ? "blue" : "gray"}
          onPress={() => changePart("natural")}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button title="문제풀기" onPress={() => setShow(!show)} />
      </View>
      <View style={{ flex: 10 }}>
        <SectionList
          ItemSeparatorComponent={flatListItemSeparator}
          sections={[0, 1, 2].map((n) => ({
            title: area[part][n][1],
            data: chapters[area[part][n][0]],
          }))}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeaderStyle}> {section.title} </Text>
          )}
          renderItem={({ item }) =>
            show ? (
              <Text
                style={{
                  ...styles.SectionListItemStyle,
                  backgroundColor: selectedChap[item.id]
                    ? "#CEEAF2"
                    : "#F5F5F5",
                }}
                onPress={() => choiceChap(item.id)}
              >
                {item.value}
              </Text>
            ) : (
              <Text style={{ height: 0 }}></Text>
            )
          }
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
    // backgroundColor: "#F5F5F5",
    // backgroundColor: "green",
  },
});
