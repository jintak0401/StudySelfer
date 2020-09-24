import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import QuestResult from "../components/QuestResult";
import ScrollContainer from "../components/ScrollContainer";
import ResultTable from "./../components/ResultTable";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding-horizontal: 10px;
`;

export default (props) => {
  console.log(props);
  const { time, studentAns } = props.route.params;
  const selAns = [1, 2, 3, 4, 5, 1, 2];
  const corAns = [1, 2, 3, 4, 1, 2, 2];

  return (
    <Container>
      <Button title="jintak" onPress={() => props.navigation.pop(2)} />
      <ResultTable time={time} studentAns={studentAns} />
      <ScrollContainer>
        {[...Array(30)]
          .map((x, i) => i + 1)
          .map((n) => (
            <QuestResult
              key={n}
              questNum={n}
              selAns={selAns[n - 1]}
              corAns={corAns[n - 1]}
              navigation={props.navigation}
            />
          ))}
      </ScrollContainer>
    </Container>
  );
};
