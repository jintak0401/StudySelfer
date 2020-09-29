import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import QuestResult from "../components/QuestResult";
import ScrollContainer from "../components/ScrollContainer";
import ResultTable from "./../components/ResultTable";
import styled from "styled-components/native";
import { apiTestAns, apiTestSolutions } from "../api";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  padding-horizontal: 10px;
  flex: 1;
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator color="blue" size="large" />
      <Text style={{ fontSize: 30 }}> 채점중 </Text>
    </View>
  ) : (
    <Container>
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
              solutions={comments.solutions}
              questData={questData}
              navigation={props.navigation}
            />
          ))}
      </ScrollContainer>
    </Container>
  );
};
