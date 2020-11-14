import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
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
import colorset from "../colorset";
import { convertRecommendTitle, screenInfo } from "../utils";
import { color } from "react-native-reanimated";
import ScrollContainer from "../components/ScrollContainer";

const { WIDTH, HEIGHT } = screenInfo;

const ProfileButton = styled.TouchableOpacity`
  margin-right: 20px;
`;
const HeaderTitle = styled.Text`
  font-size: 33px;
  color: white;
  font-family: HGG80;
`;

const HeaderSubtitle = styled.Text`
  font-size: 17px;
  margin-top: 60px;
  padding-bottom: 20px;
  color: ${colorset.brightPurple};
  font-family: HGG60;
  align-self: center;
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

const HeaderImage = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 2.843;
  position: absolute;
  top: 0;
`;

const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
  resize-mode: stretch;
`;

const ChapterBox = styled.ImageBackground`
  width: 85%;
  aspect-ratio: ${(props) => (0.85 * WIDTH) / (57 + 41 * props.len)}
  justify-content: center;
  margin-vertical: 3px;
`;

const ChapterTitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 55px;
  padding-left: 40px;
  align-items: center;
  justify-content: space-between;
`;

const ChapterTitleText = styled.Text`
  font-size: 18px;
  font-family: HGG80;
  color: ${colorset.lightBlue};
`;

const ChapterTitleCheckImage = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 46px;
`;

const ChapterSubtitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 40px;
  padding-left: 40px;
  align-items: center;
  justify-content: space-between;
`;

const ChapterSubtitleText = styled.Text`
  font-size: 13px;
  font-family: HGG60;
  color: ${colorset.darkGray};
`;
const ChaptersubTitleCheckImage = styled.Image`
  width: 15px;
  height: 15px;
  margin-right: 50px;
`;

const Seperator = styled.View`
  width: 90%;
  align-self: center;
  height: ${(props) => (props.isTitle ? 2 : 1)}px;
  background-color: ${(props) =>
    props.isTitle ? colorset.gray : colorset.lightGray};
`;

export default ({ navigation, route }) => {
  const [part, setPart] = useState("natural");
  const [selectedChap, setSelectedChap] = useState({});
  const flatListItemSeparator = () => <View />;
  const [allSelected, setAllSelected] = useState({});
  const checkImagepath = {
    checkCircle: require("../assets/Png/checkCircle.png"),
    checkCircleActive: require("../assets/Png/checkCircleActive.png"),
    toggleCircle: require("../assets/Png/toggleCircle.png"),
    toggleCircleActive: require("../assets/Png/toggleCircleActive.png"),
  };

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
      headerTransparent: true,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#4F62C0",
        height: 80,
      },
      headerTitle: () => (
        <>
          <HeaderSubtitle>한진탁 학생</HeaderSubtitle>
          <HeaderTitle>진단평가</HeaderTitle>
        </>
      ),
      headerRight: () => (
        <ProfileButton onPress={() => navigation.openDrawer()}>
          <Profile width={30} height={30} />
        </ProfileButton>
      ),
    });
  }, [route]);

  return (
    <>
      <Background source={require("../assets/Png/BackgroundPattern.png")}>
        <ScrollContainer>
          <View style={{ height: 160 }} />
          {[0, 1, 2, 3].map((n) => {
            const title = area[part][n][1];
            const data = chapters[area[part][n][0]];
            return (
              <ChapterBox
                len={data.length}
                source={require("../assets/Png/InfoBox.png")}
              >
                <ChapterTitleContainer
                  activeOpacity={0.8}
                  onPress={() => choiceSection(title)}
                >
                  <ChapterTitleText>{title}</ChapterTitleText>
                  <ChapterTitleCheckImage
                    source={
                      convertSection(title)
                        ? checkImagepath.checkCircleActive
                        : checkImagepath.checkCircle
                    }
                  />
                </ChapterTitleContainer>
                <Seperator isTitle={true} />
                {[...Array(data.length)]
                  .map((n, idx) => idx)
                  .map((val) => (
                    <View key={val}>
                      <ChapterSubtitleContainer
                        activeOpacity={0.8}
                        onPress={() => choiceChap(data[val].id)}
                      >
                        <ChapterSubtitleText>
                          {data[val].value}
                        </ChapterSubtitleText>
                        <ChaptersubTitleCheckImage
                          source={
                            selectedChap[data[val].id]
                              ? checkImagepath.toggleCircleActive
                              : checkImagepath.toggleCircle
                          }
                        />
                      </ChapterSubtitleContainer>
                      {val !== data.length - 1 && <Seperator />}
                    </View>
                  ))}
              </ChapterBox>
            );
          })}
        </ScrollContainer>
      </Background>
      <HeaderImage
        source={require("../assets/Png/HeaderBackground.png")}
      ></HeaderImage>
    </>
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
