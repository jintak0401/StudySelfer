import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  SectionList,
  Text,
  TouchableOpacity,
} from "react-native";
import { sub } from "react-native-reanimated";
import { apiPostChapter, apiPostAnswer } from "../api";
import styled, { withTheme } from "styled-components/native";
import Profile from "../assets/Svg/Profile.svg";
import { sub2num, chapters, area } from "../chapterData";
import { AntDesign } from "@expo/vector-icons";

const ProfileButton = styled.TouchableOpacity`
  margin-right: 20px;
`;
const HeaderTitle = styled.Text`
  font-size: 26px;
  color: white;
  margin-left: -15px;
  font-family: Ssangmoon;
`;
const GotoDiagnose = styled.TouchableOpacity`
  height: 50px;
  width: 80%;
  position: absolute;
  bottom: 20px;
  background-color: #4f62c0;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export default ({ navigation, route }) => {
  // const { navigation, route } = props;
  const [part, setPart] = useState("liberal");
  const [selectedChap, setSelectedChap] = useState({});
  const flatListItemSeparator = () => <View /* style={styles.separator}*/ />;
  const [allSelected, setAllSelected] = useState({});

  const convertSection = (section) => {
    let subj = "";
    for (let i = 0; i < area[part].length; i++) {
      subj = area[part][i][1] === section ? area[part][i][0] : subj;
    }
    return allSelected[subj];
  };

  const changePart = (after) => {
    setPart(after);
  };

  const choiceSection = (section) => {
    const tmp = { ...selectedChap };
    let subj = "";
    let num = 0;
    for (let i = 0; i < area[part].length; i++) {
      subj = area[part][i][1] === section ? area[part][i][0] : subj;
    }
    for (const chap in selectedChap) {
      num += selectedChap[chap] && chap.slice(0, -2) === subj ? 1 : 0;
    }
    ["_1", "_2", "_3"].forEach((tail) => {
      tmp[`${subj}${tail}`] = num !== 3;
    });
    setAllSelected({ ...allSelected, [subj]: num !== 3 });
    setSelectedChap({ ...tmp });
  };

  const choiceChap = (chap) => {
    const tmp = { ...selectedChap };
    const subj = chap.slice(0, -2);
    let check = 0;
    if (tmp[chap] === undefined) tmp[chap] = false;
    tmp[chap] = !tmp[chap];
    if (tmp[chap]) {
      for (const ch in tmp) {
        check += ch.slice(0, -2) === subj && tmp[ch] ? 1 : 0;
      }
    }
    setAllSelected({ ...allSelected, [subj]: check === 3 });
    setSelectedChap({ ...tmp });
  };

  const getData = () => {
    const ret = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    for (const key in selectedChap) {
      const [subject, num] = [
        key.slice(0, key.length - 2),
        key[key.length - 1],
      ];
      if (selectedChap[key]) ret[sub2num[subject]].push(num);
    }
    for (const key in ret) {
      ret[key].sort();
    }
    return ret;
  };

  const goToEvaluate = async () => {
    const data = getData();
    const quest = await apiPostChapter(part, data);
    navigation.navigate("진단평가문제", {
      type: quest.data.type,
      quest: { questImageUrl: quest.data.questionImageUrl },
      solution: quest.data.solutionImageUrl,
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "white",
      headerStyle: { backgroundColor: "#4F62C0", height: 60 },
      headerTitle: () => <HeaderTitle>진단평가</HeaderTitle>,
      headerRight: () => (
        <ProfileButton onPress={() => navigation.openDrawer()}>
          <Profile width={30} height={30} />
        </ProfileButton>
      ),
    });
  }, [route]);

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
      <View style={{ flex: 10 }}>
        <SectionList
          ItemSeparatorComponent={flatListItemSeparator}
          sections={(part === "natural" ? [0, 1, 2, 3] : [0, 1, 2]).map(
            (n) => ({
              title: area[part][n][1],
              data: chapters[area[part][n][0]],
            })
          )}
          renderSectionHeader={({ section }) => (
            <TouchableOpacity
              onPress={() => {
                choiceSection(section.title);
              }}
              activeOpacity={1}
              style={{
                width: "100%",
                backgroundColor: "#A9E4EB",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.sectionHeaderStyle}>{section.title}</Text>
              {convertSection(section.title) ? (
                <AntDesign
                  style={{
                    backgroundColor: "white",
                    borderRadius: 200,
                    marginRight: 30,
                  }}
                  name="checkcircle"
                  size={28}
                  color="#4f62c0"
                ></AntDesign>
              ) : (
                <AntDesign
                  style={{
                    backgroundColor: "white",
                    borderRadius: 200,
                    marginRight: 30,
                  }}
                  name="checkcircleo"
                  size={28}
                  color="#A9E4EB"
                ></AntDesign>
              )}
              {/* <AntDesign
                style={{
                  backgroundColor: "white",
                  borderRadius: 200,
                  marginRight: 30,
                }}
                name={
                  convertSection(section.title) ? "checkcircleo" : "checkcircle"
                }
                size={28}
                color={convertSection(section.title) ? "#A9E4EB" : "#4f62c0"}
              /> */}
            </TouchableOpacity>
          )}
          renderItem={({ item }) => (
            <Text
              style={{
                ...styles.SectionListItemStyle,
                backgroundColor: selectedChap[item.id] ? "#ECECEC" : "white",
              }}
              onPress={() => choiceChap(item.id)}
            >
              {item.value}
            </Text>
          )}
          ListFooterComponent={() => (
            <View style={{ height: 70, backgroundColor: "white" }} />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
      {/* <View style={{ flex: 1 }}>
        <Button
          title="답 보내기"
          onPress={() => {
            goToEvaluate();
          }}
        />
      </View> */}
      <GotoDiagnose onPress={() => goToEvaluate()}>
        <Text style={{ color: "white", fontSize: 20 }}>진단평가 시작</Text>
      </GotoDiagnose>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  areaSet: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 10,
  },
  // separator: {
  //   height: 0.5,
  //   width: "100%",
  //   backgroundColor: "skyblue",
  // },
  iconBox: {
    backgroundColor: "white",
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  sectionHeaderStyle: {
    backgroundColor: "#A9E4EB",
    fontSize: 20,
    paddingVertical: 10,
    paddingLeft: 20,
  },
  SectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: "#000",
    paddingLeft: 35,
    // backgroundColor: "#F5F5F5",
    // backgroundColor: "green",
  },
});
