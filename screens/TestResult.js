import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import QuestResult from "../components/QuestResult";
import ScrollContainer from "../components/ScrollContainer";
import ResultTable from "./../components/ResultTable";
import styled from "styled-components/native";
import { apiTestAns, apiTestSolutions } from "../api";

const Container = styled.View`
  flex: 1;
  padding-horizontal: 10px;
`;

export default (props) => {
  const { time, studentAns } = props.route.params;
  const selAns = [1, 2, 3, 4, 5, 1, 2];
  const corAns = [1, 2, 3, 4, 1, 2, 2];
  const [correctAns, setCorrectAns] = useState({});
  const [solutions, setSolutions] = useState({});

  const getCorrectAns = async () => {
    const tmp = await apiTestAns();
    setCorrectAns({ ...tmp });
  };

  const getSolutions = async () => {
    const tmp = await apiTestSolutions();
    setSolutions({ ...tmp });
  };

  useEffect(() => {
    getCorrectAns();
    getSolutions();
  });

  // console.log(correctAns);

  return (
    <Container>
      <Button title="jintak" onPress={() => props.navigation.pop(2)} />
      {correctAns ? (
        <ResultTable
          time={time}
          studentAns={studentAns}
          correctAns={correctAns}
        />
      ) : null}
      {/* <ResultTable time={time} studentAns={studentAns} /> */}
      <ScrollContainer>
        {[...Array(30)]
          .map((x, i) => i + 1)
          .map((n) => (
            <QuestResult
              key={n}
              questNum={n}
              studentAns={selAns[n - 1]}
              corAns={corAns[n - 1]}
              navigation={props.navigation}
            />
          ))}
      </ScrollContainer>
    </Container>
  );
};
