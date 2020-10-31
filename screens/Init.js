import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components/native";
import { screenInfo } from "../utils";
import StepUp from "../assets/Svg/StepUp.svg";
import NoteAndPerson from "../assets/Svg/NoteAndPerson.svg";
import TestingPeople from "../assets/Svg/TestingPeople.svg";
import Book from "../assets/Svg/Book.svg";
import Profile from "../assets/Svg/Profile.svg";
import { useFonts } from "expo-font";
import { typoSsangmoon } from "../src/Fonts";
import {
  Animated,
  Easing,
  View,
  StyleSheet,
  Linking,
  Image,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import DoubleClick from "react-native-double-tap";
import Swiper from "react-native-swiper";
import * as WebBrowser from "expo-web-browser";
import { DrawerActions } from "@react-navigation/native";
import { Svg, Line } from "react-native-svg";
import {
  BeforeRecommend,
  AfterRecommend,
  RecommendBack,
  Kakao,
} from "../assets/Svg";
import { string } from "prop-types";
// import Networking from "react-native/Libraries/Network/RCTNetworking.android"
import * as AuthSession from "expo-auth-session";
import axios from "axios";
import WebView from "react-native-webview";

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
  font-family: Ssangmoon;
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
  font-size: 23px;
  color: #4f62c0;
  font-family: Ssangmoon;
  padding-right: 5px;
`;

const Slide1 = styled.View`
  background-color: black;
  height: 100%;
`;

const Slide2 = styled.View`
  background-color: orange;
  height: 100%;
`;

const TmpText = styled.Text`
  color: white;
`;

const TmpButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: tomato;
  height: 200px;
  margin-top: 50px;
`;

const LineContainer = styled.View`
  width: 100%;
  flex: 1;
  background-color: black;
`;

// const Diagonal = styled.View`
//   left: 0px;
//   height: 200px;
//   background-color: tomato;
//   border-style: solid;
//   border-left-width: ${WIDTH};
//   border-bottom-width: 200px;
//   border-left-color: transparent;
//   border-bottom-color: white;
// `;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default ({ navigation, route }) => {
  const loaded = true;
  // const boxOpaicity = useRef(new Animated.Value(0)).current;
  // const redOpacity = boxOpaicity.interpolate({
  //   inputRange: [0, 0.5, 0.75, 1],
  //   outputRange: [1, 0, 1, 0],
  // });
  // const blueOpacity = boxOpaicity.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 1],
  // });
  // const [isRed, setIsRed] = useState(true);
  // const spinning = boxOpaicity.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ["0deg", "180deg"],
  // });

  // useEffect(() => {
  //   Animated.timing(boxOpaicity, {
  //     toValue: isRed ? 1 : 0,
  //     duration: 500,
  //     easing: Easing.bounce,
  //     useNativeDriver: true,
  //   }).start();
  // }, [isRed]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Book marginLeft={30} width={50} height={50} />,
      headerStyle: { backgroundColor: "#4F62C0", height: 100 },
      headerTitle: () => <HeaderTitle>수학노트</HeaderTitle>,
      headerRight: () => (
        <ProfileButton
          // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          onPress={() => navigation.openDrawer()}
        >
          <Profile width={30} height={30} />
        </ProfileButton>
      ),
    });
  }, [route]);

  // const [cookie, setCookie] = useState({
  //   token: "",
  //   code: "",
  //   user: "",
  //   result: "",
  // });

  // const kakao = async () => {
  //   let redirectUrl = AuthSession.getRedirectUrl();
  //   console.log(redirectUrl);
  //   console.log(encodeURIComponent(redirectUrl));
  //   const KAKAO_APP_KEY = "c6606e49f87720ff16ee1569942dc047";
  //   let result = await AuthSession.startAsync({
  //     authUrl:
  //       `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_APP_KEY}` +
  //       `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
  //       `&response_type=code`,
  //   });
  //   let body =
  //     `grant_type=authorization_code` +
  //     `&client_id=${KAKAO_APP_KEY}` +
  //     `&code=${result.params.code}` +
  //     `&redirect_uri=${encodeURIComponent(redirectUrl)}`;
  //   let response = await fetch("https://kauth.kakao.com/oauth/token", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json;charset=UTF-8",
  //       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //     },
  //     body: body,
  //   });
  //   let json = await response.json();

  //   console.log("Init.js", json);
  // };

  // const handleRedirect = async (url) => {
  // let redirectUrl = AuthSession.getRedirectUrl();
  // console.log(redirectUrl);
  // const result = await AuthSession.startAsync({
  //   authUrl: url,
  //   returnUrl: redirectUrl,
  // });
  // setCookie({ result });
  // const handleMessage = (message) => {
  //   console.log(message.nativeEvent.data);
  // };
  // return (
  //   <WebView
  //     source={{ uri: url }}
  //     injectedJavaScript="window.postMessage(document.title)"
  //     onMessage={handleMessage}
  //   />
  // );
  // let tmp = await WebBrowser.openAuthSessionAsync(url, redirectUrl);
  // setCookie(tmp);
  // console.log("Init.js", cookie);
  // };

  return loaded ? (
    <Container>
      {/* <TmpButton>
        <BeforeRecommend width={100} height={100} />
        <AfterRecommend width={100} height={100} />
      </TmpButton> */}
      {/* <LineContainer>
        <Svg height="100%" width="100%">
          <Line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="white"
            strokeWidth="10"
          />
        </Svg>
      </LineContainer> */}
      {/* <Diagonal /> */}
      {/* <TmpButton onPress={kakao}>
        <TmpText>Kakao</TmpText>
      </TmpButton> */}

      {/* <WebView
        source={{ uri: "http://3.35.52.211:9696/auth/kakao" }}
        injectedJavaScript="window.postMessage(document.title)"
        onMessage={handleMessage}
      /> */}
      {/* <GestureRecognizer
        onSwipeUp={() => onSwipeUp()}
        onSwipeRight={() => onSwipeRight()}
        onSwipeDown={() => onSwipeDown()}
        onSwipeLeft={() => onSwipeLeft()}
        config={config}
        style={{ height: 200, backgroundColor: color }}
      /> */}
      {/* <Wrapper>
        <RedBox
          style={{ opacity: redOpacity, transform: [{ rotate: spinning }] }}
        >
          <TmpButton disabled={isRed} onPress={() => setIsRed(true)}>
            <TmpText>red</TmpText>
          </TmpButton>
        </RedBox>
        <BlueBox
          style={{ opacity: blueOpacity, transform: [{ rotate: spinning }] }}
        >
          <TmpButton disabled={!isRed} onPress={() => setIsRed(false)}>
            <TmpText>blue</TmpText>
          </TmpButton>
        </BlueBox>
        <YellowBox style={{ transform: [{ rotate: spinning }] }} />
      </Wrapper> */}
      <Button
        activeOpacity={0.8}
        onPress={() => navigation.navigate("진단평가")}
      >
        <StepUp width={100} height={100} />
        <Text>진단평가</Text>
      </Button>
      <Button activeOpacity={0.8} onPress={() => navigation.navigate("추천")}>
        <NoteAndPerson width={117.71} height={100} />
        <Text>추천문제</Text>
      </Button>
      <Button
        activeOpacity={0.8}
        onPress={() => navigation.navigate("모의수능 및 모의고사")}
      >
        <TestingPeople width={97.76} height={100} />
        <Text>모의고사</Text>
      </Button>
    </Container>
  ) : null;
};
