import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  const { time, studentAns, questData } = props.route.params;
  const [comments, setComments] = useState({
    loading: true,
    correctAns: {},
    solutions: {},
  });

  const getComments = async () => {
    const { correctAns } = await apiTestAns();
    const { solutionImageUrl: solutions } = await apiTestSolutions();
    setComments({
      loading: false,
      correctAns,
      solutions,
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return comments.loading ? (
    <View style={{ flex: 1 }}>
      <ActivityIndicator flex={1} color="black" size="small" />
    </View>
  ) : (
    <Container>
      {/* <Button title="jintak" onPress={() => props.navigation.pop(2)} /> */}
      <ResultTable
        time={time}
        studentAns={studentAns}
        correctAns={comments.correctAns}
      />
      <ScrollContainer>
        {[...Array(30)]
          .map((x, i) => i + 1)
          .map((n) => (
            <QuestResult
              key={n}
              questNum={n}
              studentAns={studentAns}
              correctAns={comments.correctAns}
              // solutions={comments.solutions}
              solutions={comments.solutions}
              questData={questData}
              navigation={props.navigation}
            />
          ))}
      </ScrollContainer>
    </Container>
  );
};
