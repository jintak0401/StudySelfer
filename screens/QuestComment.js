import React, { useLayoutEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import Questions from "../components/Questions";
import ScrollContainer from "../components/ScrollContainer";
import MoveQuestBtn from "./../components/MoveQuestBtn";
import ModalAnsSheet from "./../components/ModalAnsSheet";
import Home from "../assets/Svg/Home.svg";
import TestAdditionalFunc from "../components/TestAdditionalFunc";
import QuestSummary from "../components/QuestSummary";

const TitleContainer = styled.View`
  margin-left: -20px;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  font-size: 23px;
  color: #4f62c0;
`;

const HeaderSubtitle = styled.Text`
  font-size: 15px;
  color: #999999;
`;

const IconSet = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 20px;
  margin-top: 10px;
`;

const HomeButton = styled.TouchableOpacity`
  margin-right: 15px;
`;

const Container = styled.View`
  flex: 1;
`;

const AnswersContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  margin-vertical: 10px;
`;

// border-top-width: 3px;
// border-style: solid;
// border-color: #95989a;

const Divider = styled.View`
  justify-content: center;
  align-items: center;
`;

const DividerText = styled.Text`
  font-size: 20px;
  color: gray;
`;

export default (props) => {
  const { navigation, route } = props;
  const {
    qNum,
    studentAns,
    correctAns,
    questData,
    bookmarks,
    solutions,
  } = props.route.params;
  const [questNum, setQuestNum] = useState(qNum);
  const [modalVisible, setModalVisible] = useState(false);
  const setModal = (n) => setModalVisible(!modalVisible);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "white",
        height: 80,
        elevation: 1,
        borderBottomWidth: 3,
        borderColor: "#95989A",
      },
      headerTitle: () => (
        <TitleContainer>
          <HeaderTitle>해설 보기</HeaderTitle>
          <HeaderSubtitle>2020년 7월 모의고사</HeaderSubtitle>
        </TitleContainer>
      ),
      headerRight: () => (
        <IconSet>
          <HomeButton onPress={() => navigation.popToTop()}>
            <Home width={28} height={28} />
          </HomeButton>
          <TestAdditionalFunc
            funcName="subtitles"
            setActive={setModal}
            questNum={questNum}
          />
        </IconSet>
      ),
    });
  }, [route]);

  return (
    <Container>
      <ModalAnsSheet
        inTest={false}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        studentAns={studentAns}
        correctAns={correctAns}
        bookmarks={bookmarks}
        time={300}
        changeQuestNum={(n) => setQuestNum(n)}
      />
      <QuestSummary
        questNum={questNum}
        studentAns={studentAns[questNum]}
        correctAns={correctAns[questNum]}
      />
      {/* <AnswersContainer>
        {studentAns[questNum] !== correctAns[questNum] ? (
          <Text style={{ color: "red", marginHorizontal: 5, fontSize: 20 }}>
            {studentAns[questNum] ? studentAns[questNum] : "입력없음"}
          </Text>
        ) : null}
        <Text style={{ color: "blue", marginHorizontal: 5, fontSize: 20 }}>
          {correctAns[questNum]}
        </Text>
      </AnswersContainer> */}
      <Divider>
        <DividerText>--------- 문제 ---------</DividerText>
      </Divider>
      <Questions questNum={questNum} questData={questData[questNum]} />
      <Divider>
        <DividerText>--------- 해설 ---------</DividerText>
      </Divider>
      <Questions
        questNum={questNum}
        questData={{ questImageUrl: solutions[questNum] }}
      />
      <MoveQuestBtn
        inTest={false}
        questNum={questNum}
        changeQuestNum={(qNum) => setQuestNum(qNum)}
      />
    </Container>

    // <View style={styles.container}>
    //   <View style={{ ...styles.box, flex: 1 }}>
    //     <Text>선택내용</Text>
    //   </View>
    //   <View style={{ ...styles.box, flex: 3 }}>
    //     <Text>{questNum}번 문제</Text>
    //   </View>
    //   <View style={{ ...styles.box, flex: 3 }}>
    //     <Text>해설</Text>
    //   </View>
    //   <MoveQuestBtn
    //     inTest={false}
    //     questNum={questNum}
    //     changeQuestNum={(qNum) => setQuestNum(qNum)}
    //   />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    borderBottomWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
