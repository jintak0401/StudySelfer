import React, { useState } from "react";
import { Switch } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { AntDesign } from "@expo/vector-icons";
import { timerFormatMinute } from "../utils";

const Container = styled.View`
  height: 70px;
  width: 100%;
  flex-direction: row;
`;

const TimeContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const TimeText = styled.Text`
  font-size: 18px;
  color: black;
  text-align: center;
  text-align-vertical: center;
`;

const NextButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: white;
`;

const DontKnowButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: white;
`;

const DontKnowText = styled.Text`
  color: black;
  font-size: 18px;
  text-align: center;
  text-align-vertical: center;
  ${(props) => (props.dontKnow ? "font-weight : bold" : null)};
`;

const TimeAndNext = ({ time, goToNext, dontKnow, setDontKnow }) => {
  const [showTime, setShowTime] = useState(true);

  return (
    <Container>
      <TimeContainer>
        <TimeText>
          {showTime ? `${timerFormatMinute(time)}` : `시간 숨김`}
        </TimeText>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={showTime ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setShowTime(!showTime)}
          value={showTime}
        />
      </TimeContainer>
      <DontKnowButton onPress={() => setDontKnow((prev) => !prev)}>
        <AntDesign
          name={"questioncircle" + (dontKnow ? "" : "o")}
          size={24}
          color="black"
        />
        <DontKnowText dontKnow={dontKnow}>모르겠어요</DontKnowText>
      </DontKnowButton>
      <NextButton
        onPress={() => {
          goToNext();
        }}
      >
        <AntDesign name="rightcircle" size={40} color="#A9E4EB" />
      </NextButton>
    </Container>
  );
};

TimeAndNext.propTypes = {
  time: PropTypes.number.isRequired,
  goToNext: PropTypes.func.isRequired,
  dontKnow: PropTypes.bool.isRequired,
  setDontKnow: PropTypes.func.isRequired,
};

export default TimeAndNext;
