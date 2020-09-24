import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import MoveQuestBtn from "./../components/MoveQuestBtn";

export default (props) => {
  const {
    qNum,
    studentAns,
    correctAns,
    questData,
    commentData,
  } = props.route.params;
  const [questNum, setQuestNum] = useState(qNum);
  return (
    <View style={styles.container}>
      <View style={{ ...styles.box, flex: 1 }}>
        <Text>선택내용</Text>
      </View>
      <View style={{ ...styles.box, flex: 3 }}>
        <Text>{questNum}번 문제</Text>
      </View>
      <View style={{ ...styles.box, flex: 3 }}>
        <Text>해설</Text>
      </View>
      <MoveQuestBtn
        inTest={false}
        questNum={questNum}
        changeQuestNum={(qNum) => setQuestNum(qNum)}
      />
    </View>
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
