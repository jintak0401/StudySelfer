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
import { Animated, Easing } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

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

const RedBox = styled(Animated.View)`
  height: 200px;
  width: 50px;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const BlueBox = styled(Animated.View)`
  height: 100px;
  width: 100px;
  background-color: blue;
  justify-content: center;
  align-items: center;
`;

const YellowBox = styled(Animated.View)`
  height: 200px;
  width: 200px;
  background-color: yellow;
`;

const Wrapper = styled.View`
  width: 90%;
  justify-content: space-between;
  flex-direction: row;
`;

const TmpButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TmpText = styled.Text`
  font-size: 30px;
  color: white;
`;

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

  const [color, setColor] = useState("red");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Book marginLeft={30} width={50} height={50} />,
      headerStyle: { backgroundColor: "#4F62C0", height: 100 },
      headerTitle: () => <HeaderTitle>수학노트</HeaderTitle>,
      headerRight: () => (
        <ProfileButton>
          <Profile width={30} height={30} />
        </ProfileButton>
      ),
    });
  }, [route]);

  const onSwipeUp = () => {
    setColor("red");
    console.log("up");
  };

  const onSwipeRight = () => {
    setColor("blue");
    console.log("right");
  };
  const onSwipeDown = () => {
    setColor("yellow");
    console.log("down");
  };
  const onSwipeLeft = () => {
    setColor("black");
    console.log("left");
  };
  const config = { directionalOffsetThreshold: 500, gestureClickThreshold: 5 };

  return loaded ? (
    <Container>
      <GestureRecognizer
        onSwipeUp={() => onSwipeUp()}
        onSwipeRight={() => onSwipeRight()}
        onSwipeDown={() => onSwipeDown()}
        onSwipeLeft={() => onSwipeLeft()}
        config={config}
        style={{ height: 200, backgroundColor: color }}
      />
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
      <Button
        activeOpacity={0.8}
        onPress={() => navigation.navigate("추천문제")}
      >
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
