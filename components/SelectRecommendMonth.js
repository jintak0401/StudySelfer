import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Dash from "react-native-dash";

const Container = styled.View`
  width: 85%;
  justify-content: center;
  margin-bottom: 2px;
  margin-bottom: 25px;
`;

const TestTitleButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const TestTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ContainerText = styled.Text`
  color: #999999;
  font-size: 17px;
`;

const SelectRecommendMonth = ({ keyValue, setMonthKey }) => {
  const title = `20${keyValue.slice(0, 2)}년 ${keyValue.slice(2)}월`;

  return (
    <Container>
      <TestTitleContainer>
        <TestTitleButton
          onPress={() => {
            setMonthKey(keyValue);
          }}
        >
          <ContainerText>{title}</ContainerText>
        </TestTitleButton>
      </TestTitleContainer>
      <Dash
        style={{ position: "absolute", top: 22.7, width: "100%", height: 1 }}
        dashGap={3}
        dashLength={5}
        dashThickness={1}
        dashColor="#999999"
      />
    </Container>
  );
};

SelectRecommendMonth.propTypes = {
  keyValue: PropTypes.string.isRequired,
  setMonthKey: PropTypes.func.isRequired,
};

export default SelectRecommendMonth;
