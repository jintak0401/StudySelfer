import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Text } from "react-native";

const Container = styled.ImageBackground`
  width: 95%;
  aspect-ratio: 1.6;
  justify-content: center;
  align-items: center;
`;

const InfoBox = ({ children }) => {
  return (
    <Container source={require("../../assets/Png/InfoBox.png")}>
      {children}
    </Container>
  );
};

export default InfoBox;

InfoBox.propTypes = {
  children: PropTypes.node.isRequired,
};
