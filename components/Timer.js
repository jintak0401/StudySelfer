import React, { useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { timerFormat } from "../utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import colorset from "../colorset";

const Container = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`;

const TimeText = styled.Text`
  font-size: 16px;
  margin-right: 10px;
  color: ${colorset.skyblue};
  font-family: HGG60;
  font-weight: bold;
  text-align: center;
  text-align-vertical: center;
`;

const Timer = ({ time }) => {
  const [show, setShow] = useState(true);
  return (
    <Container>
      <Collapsible collapsed={!show}>
        <TimeText>{timerFormat(time, true)}</TimeText>
      </Collapsible>
      <MaterialCommunityIcons
        onPress={() => setShow(!show)}
        name="clock-outline"
        size={30}
        color={show ? "white" : "#999999"}
      />
    </Container>
  );
};

export default Timer;

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};
