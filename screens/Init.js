import React, { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import StepUp from "../assets/Svg/StepUp.svg";
import NoteAndPerson from "../assets/Svg/NoteAndPerson.svg";
import TestingPeople from "../assets/Svg/TestingPeople.svg";
import Book from "../assets/Svg/Book.svg";
import Profile from "../assets/Svg/Profile.svg";
import { ToastAndroid } from "react-native";
import { apiGetRecommendNode } from "../api";
import { solvedData } from "../solvedData";

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

const GoToDiagResult = styled.TouchableOpacity`
  background-color: tomato;
  height: 50px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

const GoToDiagText = styled.Text`
  font-size: 20px;
`;

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
  const msg = "먼저 진단평가를 봐주세요!";

  const getData = async () => {
    const data = await apiGetRecommendNode();
    return data;
  };

  const goToRecommend = async () => {
    const data = await apiGetRecommendNode();
    navigation.navigate("새 추천", {
      ...data,
    });
  };

  const showMsg = () => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Book marginLeft={30} width={50} height={50} />,
      headerStyle: { backgroundColor: "#4F62C0", height: 100 },
      headerTitle: () => <HeaderTitle>수학노트</HeaderTitle>,
      headerRight: () => (
        <ProfileButton onPress={() => navigation.openDrawer()}>
          <Profile width={30} height={30} />
        </ProfileButton>
      ),
    });
  }, [route]);

  return loaded ? (
    <Container>
      <GoToDiagResult onPress={() => navigation.navigate("새 진단평가결과")}>
        <GoToDiagText>진단결과</GoToDiagText>
      </GoToDiagResult>
      <GoToDiagResult
        style={{ marginTop: 30 }}
        onPress={() => navigation.navigate("새 추천")}
      >
        <GoToDiagText>추천문제</GoToDiagText>
      </GoToDiagResult>
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
        onPress={() => navigation.navigate("새 진단평가")}
      >
        <StepUp width={100} height={100} />
        <Text>진단평가</Text>
      </Button>
      <Button
        activeOpacity={0.8}
        onPress={() => {
          solvedData.diagnose ? goToRecommend() : showMsg();
        }}
      >
        <NoteAndPerson width={117.71} height={100} />
        <Text>추천문제</Text>
      </Button>
      <Button
        activeOpacity={0.8}
        onPress={
          () => navigation.navigate("모의수능 및 모의고사")
          // solvedData.diagnose
          //   ? navigation.navigate("모의수능 및 모의고사")
          //   : showMsg()
        }
      >
        <TestingPeople width={97.76} height={100} />
        <Text>모의고사</Text>
      </Button>
    </Container>
  ) : null;
};
