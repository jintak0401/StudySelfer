import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import {
  TodayRecommend,
  TodayRecommendActive,
  LastRecommend,
  LastRecommendActive,
} from "../assets/Svg";

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

const SelectRecommend = ({ selectedTab, setSelectedTab, resetKey }) => {
  return (
    <Container>
      {selectedTab === "today" ? (
        <TodayRecommendActive
          width={160}
          height={35}
          onPress={() => {
            if (selectedTab === "past") resetKey();
            setSelectedTab("today");
          }}
        />
      ) : (
        <TodayRecommend
          width={160}
          height={35}
          onPress={() => {
            if (selectedTab === "past") resetKey();
            setSelectedTab("today");
          }}
        />
      )}
      {/* <Button
        isSelected={selectedTab === "today"}
        onPress={() => {
          if (selectedTab === "past") resetKey();
          setSelectedTab("today");
        }}
      >
        <Text>오늘의 추천문제</Text>
      </Button> */}
      {selectedTab === "past" ? (
        <LastRecommendActive
          style={{ marginLeft: 20 }}
          width={160}
          height={35}
          onPress={() => {
            if (selectedTab === "today") resetKey();
            setSelectedTab("past");
          }}
        />
      ) : (
        <LastRecommend
          style={{ marginLeft: 20 }}
          width={160}
          height={35}
          onPress={() => {
            if (selectedTab === "today") resetKey();
            setSelectedTab("past");
          }}
        />
      )}
      {/* <Button
        isSelected={selectedTab === "past"}
        onPress={() => {
          if (selectedTab === "today") resetKey();
          setSelectedTab("past");
        }}
      >
        <Text>지난 추천문제</Text>
      </Button> */}
    </Container>
  );
};

SelectRecommend.propTypes = {
  selectedTab: PropTypes.string,
  setSelectedTab: PropTypes.func.isRequired,
  resetKey: PropTypes.func.isRequired,
};

export default SelectRecommend;
