import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import {
  ResultSummary,
  StrongChap,
  WeakChap,
  Graph,
  GoRecommendButton,
} from "../components/Diagnose";
// import ResultSummary from "../components/Diagnose/ResultSummary";
// import StrongChap from "../components/Diagnose/StrongChap";
import {
  DrawerMenu,
  BackMarkWhite,
  TitleImage,
  ProfileImage,
} from "../assets/Svg";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import colorset from "../colorset";
import Swiper from "react-native-swiper";
import { screenInfo } from "../utils";

const { WIDTH, HEIGHT } = screenInfo;

const TopImage = styled.Image`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
`;

const Container = styled.ScrollView`
  width: 100%;
  margin-top: 90px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

const ScrollHeader = styled.View`
  width: 100%;
  height: 170px;
  background-color: white;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

const ScrollBody = styled.View`
  position: absolute;
  top: 80px;
  width: 100%;
  height: 100%;
  background-color: white;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

const HeaderTitle = styled.Image`
  width: 30%;
  height: 20px;
  resize-mode: stretch;
`;

const ChapterImage = styled.Image`
  width: 80%;
  height: ${WIDTH * 0.8 * 0.6265}px;
  resize-mode: contain;
`;

const Divider = styled.View`
  background-color: ${colorset.lightGray};
  width: 80%;
  height: 2px;
  margin-vertical: 20px;
`;

const DiagnoseResult = (props) => {
  const { navigation, route } = props;
  const strong = {
    1: require("../assets/Png/StrongChap1.png"),
    2: require("../assets/Png/StrongChap2.png"),
    3: require("../assets/Png/StrongChap3.png"),
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerTransparent: true,
      headerStyle: { backgroundColor: "#4F62C0", height: 100 },
      headerTitle: () => <TitleImage width={120} height={40} />,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.pop(1);
          }}
        >
          <BackMarkWhite width={20} height={20} style={{ marginLeft: 20 }} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <DrawerMenu
          width={25}
          height={25}
          style={{ marginRight: 20 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
    });
  }, [route]);

  return (
    <View>
      <TopImage source={require("../assets/Png/StartPage.png")} />
      <Container
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ height: 50, width: 100 }} />
        <ScrollBody />
        <ProfileImage
          style={{
            position: "absolute",
            top: 30,
            left: 10,
          }}
          width={170}
          height={170}
        />
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            top: 50,
            left: 160,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontFamily: "HGG80",
            }}
          >
            한진탁
            <Text style={{ color: "white", fontSize: 15, fontFamily: "HGG60" }}>
              {"  "}학생의 분석리포트
            </Text>
          </Text>
          <Text
            style={{
              marginTop: 15,
              color: colorset.darkGray,
              fontFamily: "HGG80",
            }}
          >
            연속 {13}일 출석
            <Text style={{ color: colorset.lightBlue, fontFamily: "HGG60" }}>
              {"    "}지난출석 {"2020.11.15"}
            </Text>
          </Text>
        </View>
        <View style={{ marginTop: 100 }}>
          <ResultSummary />
        </View>
        <Divider />
        <Graph />
        <Divider />
        <View style={styles.chapter}>
          <StrongChap />
        </View>
        <View style={{ ...styles.chapter, marginTop: -30, marginBottom: -50 }}>
          <WeakChap />
        </View>
        <Divider />
        <GoRecommendButton />
        <View style={styles.footer} />
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  swiper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: "80%",
    height: WIDTH * 0.8 * 0.6265,
    resizeMode: "contain",
  },
  chapter: {
    height: 340,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: 200,
  },
});

export default DiagnoseResult;
