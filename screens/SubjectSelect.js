import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components/native";
import { subjectInfo, subj2kor } from "../testInfo";

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const SubejectButton = styled.TouchableOpacity`
  flex: 1;
  width: 90%;
  elevation: 7;
  margin-vertical: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #bce0fd;
  background-color: white;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const SubjectText = styled.Text`
  color: #4f62c0;
  font-size: 23px;
  font-family: Ssangmoon;
  text-align: center;
  text-align-vertical: center;
`;

const SubjectSelect = ({ route, navigation }) => {
  const subjects = Object.keys(subjectInfo);
  const [subject, setSubject] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const goToTest = (mode) => {
    switch (mode) {
      case "elevation":
        navigation.navigate("진단평가", { subject: subject });
        break;
      case "recommend":
        navigaion.navigate("추천문제", { subject: subject });
        break;
      case "test":
        navigation.navigate("모의수능 및 모의고사");
        break;
      default:
        console.error(
          "SubjectSelect.js --> goToTest --> mode is not available value : ",
          mode
        );
    }
  };
  return (
    <Container>
      {subjects.map((name) => (
        <SubejectButton
          key={name}
          onPress={() => {
            // setSubject(name);
            navigation.navigate("초기화면");
          }}
        >
          <SubjectText>{subj2kor[name]}</SubjectText>
        </SubejectButton>
      ))}
    </Container>
  );
};

export default SubjectSelect;
