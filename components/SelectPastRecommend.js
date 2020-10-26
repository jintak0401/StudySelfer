import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Collapsible from "react-native-collapsible";
import { getSolvedMonth, solvedData } from "../../solvedData";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Dash from "react-native-dash";
import { getTestTitle } from "../../utils";
import { convertRecommendTitle } from "../utils";

const DisplayFirstContainer = styled.View`
  border-width: 2px;
  border-top-width: 0px;
  border-style: solid;
  border-color: #4f62c0;
  background-color: #eefafb;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-content: flex-start;
  align-items: center;
  padding-horizontal: 10px;
  height: 100px;
`;

const DisplaySecondContainer = styled.View`
  position: absolute;
  height: 85%;
  width: 95%;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-horizontal: 100px;
  padding-horizontal: 10px;
  justify-content: center;
`;

const LastData = styled.Text`
  color: #4f62c0;
  font-size: 20px;
  font-weight: bold;
`;

const SolvedDataWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  margin-horizontal: 5px;
`;

const SolvedDataText = styled.Text`
  color: #999999;
  font-size: 14px;
  letter-spacing: ${(props) => (props.isTime ? -1 : 0)}px;
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const ResultText = styled.Text`
  background-color: #999999;
  padding-horizontal: 13px;
  border-radius: 20px;
  color: white;
`;

const Container = styled.View`
  width: 85%;
  justify-content: center;
  margin-bottom: 2px;
  ${(props) => props.isSat && `margin-bottom: 25px`};
`;

const ContainerButton = styled.TouchableOpacity`
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 5px;
`;

const TestTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TestTitleButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ContainerText = styled.Text`
  color: ${(props) => (props.selected ? "#4F62C0" : "#999999")};
  font-size: 17px;
`;

const DisplaySolvedData = ({ time, result, goToResult, goToQuestions }) => {
  return (
    <DisplayFirstContainer>
      <DisplaySecondContainer>
        <LastData>지난 기록</LastData>
        <SolvedDataWrapper>
          <SolvedDataText isTime={true}>{time}</SolvedDataText>
          <SolvedDataText>{result}</SolvedDataText>
          <Button onPress={() => goToResult()}>
            <ResultText>결과 보기</ResultText>
          </Button>
          <Button
            onPress={() => {
              goToQuestions();
            }}
          >
            <FontAwesome5 name="redo" size={20} color="#999999" />
          </Button>
        </SolvedDataWrapper>
      </DisplaySecondContainer>
    </DisplayFirstContainer>
  );
};

const SelectMonth = ({
  key,
  selectedPast,
  selectPast,
  goToResult,
  goToQuestions,
}) => {
  const [selected, setSelected] = useState(false);
  const [time, result] = solvedData.recommend[key];
  const title = convertRecommendTitle(key);

  useEffect(() => {
    setSelected(selectedPast === key);
  }, [selectedPast]);

  return (
    <Container isSat={true}>
      <TestTitleContainer>
        <TestTitleButton
          onPress={() => {
            selectPast(key);
          }}
        >
          <ContainerText selected={selected}>{title}</ContainerText>
        </TestTitleButton>
      </TestTitleContainer>
      <Dash
        style={{ position: "absolute", top: 22.8, width: "100%", height: 1 }}
        dashGap={3}
        dashLength={5}
        dashThickness={1}
        dashColor={selected ? "#4f62c0" : "#999999"}
      />
      <Collapsible collapsed={!selected}>
        <DisplaySolvedData
          time={time}
          result={result}
          goToResult={() => goToResult(key)}
          goToQuestions={() => goToQuestions(key)}
        />
      </Collapsible>
    </Container>
  );
};

SelectMonth.propTypes = {
  key: PropTypes.number.isRequired,
  selectedPast: PropTypes.number,
  selectPast: PropTypes.func.isRequired,
  goToResult: PropTypes.func.isRequired,
  goToQuestions: PropTypes.func.isRequired,
};

export default SelectMonth;
