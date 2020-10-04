import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: ${(props) => (props.isSelected ? "#4F62C0" : "#CCCCCC")};
  margin-horizontal: 8px;
  width: 160px;
  height: 35px;
`;

const Text = styled.Text`
  font-size: 16px;
  color: white;
  font-family: NanumSquare;
  font-weight: bold;
`;

const SelectTest = ({
  selectedTest,
  setSelectedTest,
  setSelectedMonth,
  setSelectedYear,
}) => {
  return (
    <Container>
      <Button
        isSelected={selectedTest === "mockTest"}
        onPress={() => {
          setSelectedYear(0);
          setSelectedMonth(0);
          setSelectedTest("mockTest");
        }}
      >
        <Text>기출 모의고사</Text>
      </Button>
      <Button
        isSelected={selectedTest === "sat"}
        onPress={() => {
          setSelectedYear(0);
          setSelectedMonth(0);
          setSelectedTest("sat");
        }}
      >
        <Text>대학 수학 능력시험</Text>
      </Button>
    </Container>
  );
};

SelectTest.propTypes = {
  selectedTest: PropTypes.string,
  setSelectedTest: PropTypes.func.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
  setSelectedYear: PropTypes.func.isRequired,
};

export default SelectTest;
