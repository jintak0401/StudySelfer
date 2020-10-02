import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Collapsible from "react-native-collapsible";
import { getSolvedMonth } from "../solvedData";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Dash from "react-native-dash";
import { getTestTitle } from "../utils";

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
  margin-bottom: 5px;
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
  justify-content: ${(props) =>
    props.isSolved ? "space-between" : "flex-start"};
  align-items: center;
`;

const ContainerText = styled.Text`
  color: ${(props) => (props.selected ? "#4F62C0" : "#999999")};
  font-size: 17px;
`;

const ButtonText = styled.Text`
  background-color: tomato;
  font-size: 14px;
`;

const DashedLine = styled.View`
  height: 0px;
  border-width: 1px;
  border-style: dashed;
  border-color: black;
  width: 100%;
  border-radius: 20px;
`;

const DisplaySolvedData = ({ time, grade, rank, setRestudyModalVisible }) => {
  return (
    <DisplayFirstContainer>
      <DisplaySecondContainer>
        <LastData>지난 기록</LastData>
        <SolvedDataWrapper>
          <SolvedDataText>{time}</SolvedDataText>
          <SolvedDataText>{grade}</SolvedDataText>
          <SolvedDataText>{rank}</SolvedDataText>
          <Button>
            <ResultText>채점 결과</ResultText>
          </Button>
          <Button
            onPress={() => {
              setRestudyModalVisible(true);
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
  selectedMonth,
  setSelectedMonth,
  setRestudyModalVisible,
  setModeModalVisible,
  year,
  month,
}) => {
  const [selected, setSelected] = useState(false);
  const title = getTestTitle(year, month);
  const isSolved = getSolvedMonth(year, month);
  const [time, grade, rank] = isSolved || [0, 0, 0];

  useEffect(() => {
    setSelected(month === selectedMonth);
  }, [selectedMonth]);
  return (
    <Container>
      <TestTitleContainer>
        <TestTitleButton
          isSolved={isSolved}
          onPress={() => {
            setSelectedMonth(selected ? 0 : month);
            isSolved ? null : setModeModalVisible(true);
          }}
        >
          <ContainerText selected={selected}>{title}</ContainerText>
          {isSolved ? (
            <MaterialCommunityIcons
              name="pencil-outline"
              size={23}
              color={selected ? "#4f62c0" : "#999999"}
            />
          ) : null}
        </TestTitleButton>
      </TestTitleContainer>
      <Dash
        style={{ width: "100%", height: 0.9 }}
        dashGap={3}
        dashLength={5}
        dashThickness={1}
        dashColor={selected ? "#4f62c0" : "#999999"}
      />
      {isSolved ? (
        <Collapsible collapsed={!selected}>
          <DisplaySolvedData
            time={time}
            grade={grade}
            rank={rank}
            setSelected={setSelected}
            setRestudyModalVisible={setRestudyModalVisible}
          />
        </Collapsible>
      ) : null}
    </Container>
  );
};

SelectMonth.propTypes = {
  selectedMonth: PropTypes.number.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
  setRestudyModalVisible: PropTypes.func.isRequired,
  setModeModalVisible: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};

export default SelectMonth;
