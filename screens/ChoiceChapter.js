import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  SectionList,
  Text,
  TouchableOpacity,
} from "react-native";
import { apiPostEvaluationInit } from "../api";
import styled from "styled-components/native";
import Profile from "../assets/Svg/Profile.svg";
import { chapters, area, chap2id } from "../chapterData";
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
  const [part, setPart] = useState("liberal");
  const [selectedChap, setSelectedChap] = useState({});
  const flatListItemSeparator = () => <View />;
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
    const len = chapters[subj].length;
    for (const chap in selectedChap) {
      num += selectedChap[chap] && chap.slice(0, -2) === subj ? 1 : 0;
    }
    [...Array(len)]
      .map((_, idx) => `_${idx + 1}`)
      .forEach((tail) => {
        tmp[`${subj}${tail}`] = num !== len;
      });
    setAllSelected({ ...allSelected, [subj]: num !== len });
    setSelectedChap({ ...tmp });
  };

  const choiceChap = (chap) => {
    const tmp = { ...selectedChap };
    const subj = chap.slice(0, -2);
    const len = chapters[subj].length;
    let check = 0;
    if (tmp[chap] === undefined) tmp[chap] = false;
    tmp[chap] = !tmp[chap];
    if (tmp[chap]) {
      for (const ch in tmp) {
        check += ch.slice(0, -2) === subj && tmp[ch] ? 1 : 0;
      }
    }
    setAllSelected({ ...allSelected, [subj]: check === len });
    setSelectedChap({ ...tmp });
  };

  const getChap = () => {
    const parts = [];
    for (const key in selectedChap) {
      if (selectedChap[key]) parts.push(chap2id[key]);
    }
    return parts;
  };

  const goToEvaluate = async () => {
    const chapter = getChap();
    const data = await apiPostEvaluationInit(part, chapter);
    navigation.navigate("진단평가문제", {
      ...data,
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
          color={part === "liberal" ? "#4F62C0" : "#999999"}
          onPress={() => changePart("liberal")}
        />
        <Button
          title="        이과        "
          color={part === "natural" ? "#4F62C0" : "#999999"}
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
  },
});
