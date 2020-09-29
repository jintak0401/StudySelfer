import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import Questions from "../components/Questions";
import ScrollContainer from "../components/ScrollContainer";
import MoveQuestBtn from "./../components/MoveQuestBtn";

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

const Divider = styled.View`
  justify-content: center;
  align-items: center;
`;

const DividerText = styled.Text`
  font-size: 20px;
  color: gray;
`;

export default (props) => {
  const {
    qNum,
    studentAns,
    correctAns,
    questData,
    solutions,
  } = props.route.params;
  const [questNum, setQuestNum] = useState(qNum);

  return (
    <Container>
      <AnswersContainer>
        {studentAns[questNum] !== correctAns[questNum] ? (
          <Text style={{ color: "red", marginHorizontal: 5, fontSize: 20 }}>
            {studentAns[questNum] ? studentAns[questNum] : "입력없음"}
          </Text>
        ) : null}
        <Text style={{ color: "blue", marginHorizontal: 5, fontSize: 20 }}>
          {correctAns[questNum]}
        </Text>
      </AnswersContainer>
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
