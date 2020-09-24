import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import Questions from "../components/Questions";
import MoveQuestBtn from "./../components/MoveQuestBtn";

const Container = styled.View`
  flex: 1;
`;

const AnswersContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export default (props) => {
  const {
    qNum,
    studentAns,
    correctAns,
    questData,
    commentData,
  } = props.route.params;
  const [questNum, setQuestNum] = useState(qNum);
  console.log(questNum);
  return (
    <Container>
      <AnswersContainer>
        {studentAns[questNum - 1] !== correctAns[questNum - 1] ? (
          <Text style={{ color: "red", marginHorizontal: 5 }}>
            {studentAns[questNum - 1]}
          </Text>
        ) : null}
        <Text style={{ color: "blue", marginHorizontal: 5 }}>
          {correctAns[questNum - 1]}
        </Text>
      </AnswersContainer>
      <Questions questNum={questNum} questData={questData[questNum]} />
      <View style={{ ...styles.box, flex: 3 }}>
        <Text>해설</Text>
      </View>
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
