import React, { useRef, useState, useEffect } from "react";
import { Animated, Easing, StatusBar, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./navigation/Stack";
import Drawer from "./navigation/Drawer";
import { fonts } from "./src/Fonts";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import { Book, FlyingPapers, WalkingPerson } from "./assets/Svg";
import { screenInfo } from "./utils";
import { Kakao } from "./assets/Svg";

const { HEIGHT } = screenInfo;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #4f62c0;
`;

const Title = styled.Text`
  color: white;
  font-size: 50px;
  font-family: Ssangmoon;
  margin-top: 20px;
  text-align: center;
`;

const Subtitle = styled.Text`
  color: white;
  font-size: 19px;
  font-family: NanumSquare;
  margin-top: 2px;
  text-align: center;
  letter-spacing: 1px;
`;

const Wrapper = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

const KakaoContainer = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

const KakaoButton = styled.TouchableOpacity`
  width: 260px;
  height: 60px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background-color: #ffdc00;
  flex-direction: row;
`;

const KakaoText = styled.Text`
  color: #513228;
  font-size: 17px;
  letter-spacing: -1px;
  font-weight: bold;
  margin-horizontal: 10px;
`;

export default function App() {
  const [fontLoad] = useFonts(fonts);
  const [splashLoad, setSplashLoad] = useState(false);
  const [splashEnd, setSplashEnd] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const moveUp = useRef(new Animated.Value(0)).current;
  const kakaoOpacity = useRef(new Animated.Value(0)).current;
  const [isTimeToGo, setIsTimeToGo] = useState(false);

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: splashLoad ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [splashLoad]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: splashLoad ^ splashEnd ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [splashLoad, splashEnd]);

  useEffect(() => {
    Animated.timing(moveUp, {
      toValue: splashEnd ? -(HEIGHT / 10) : 0,
      duration: 500,
      delay: 200,
      easing: Easing.easeInOutQuint,
      useNativeDriver: true,
    }).start();
    Animated.timing(kakaoOpacity, {
      toValue: splashEnd ? 1 : 0,
      duration: 500,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, [splashEnd]);

  useEffect(() => {
    if (fontLoad) {
      setSplashLoad(true);
    }
  }, [fontLoad]);

  useEffect(() => {
    const wait = async () => {
      await setTimeout(() => setSplashEnd(true), 2000);
    };
    if (splashLoad) wait();
  }, [splashLoad]);

  // useEffect(() => {
  //   const wait = async () => {
  //     await setTimeout(() => setIsTimeToGo(true), 5000);
  //   };
  //   if (splashEnd) wait();
  // }, [splashEnd]);

  return isTimeToGo ? (
    <>
      <NavigationContainer>
        {/* <Stack /> */}
        <Drawer />
      </NavigationContainer>
      <StatusBar backgroundColor="#6c63ff" barStyle="light-content" />
    </>
  ) : fontLoad ? (
    <Container>
      <Wrapper
        style={{
          opacity: fadeAnim,
          position: "absolute",
          right: -10,
          bottom: 50,
        }}
      >
        <WalkingPerson />
      </Wrapper>
      <Wrapper
        style={{
          opacity: fadeAnim,
          position: "absolute",
          left: -20,
          top: 40,
        }}
      >
        <FlyingPapers />
      </Wrapper>
      <Wrapper
        style={{ opacity: logoOpacity, transform: [{ translateY: moveUp }] }}
      >
        <Book width={130} height={150} />
        <Title>수학노트</Title>
        <Subtitle>진단·추천·기출문제 풀이</Subtitle>
      </Wrapper>
      <KakaoContainer style={{ opacity: kakaoOpacity }}>
        <KakaoButton
          disabled={!splashEnd}
          activeOpacity={0.9}
          onPress={() => setIsTimeToGo(true)}
        >
          <Kakao style={{ marginLeft: 10 }} width={30} height={30} />
          <KakaoText>카카오 아이디로 로그인</KakaoText>
        </KakaoButton>
      </KakaoContainer>
    </Container>
  ) : (
    <Container />
  );
}
