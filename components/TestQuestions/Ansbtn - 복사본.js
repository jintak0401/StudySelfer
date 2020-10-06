import React, { useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Button = styled.TouchableHighlight`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-color: white;
  border-left-width: ${(props) => (!props.isFirst ? 1 : 0)}px;
`;

const Text = styled.Text`
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isSelected ? "#4F62C0" : "#CCCCCC")};
  font-weight: bold;
  font-size: 25px;
  color: white;
  text-align: center;
  padding-vertical: 20px;
`;

const Ansbtn = ({
  ansNum,
  isSelected,
  selectAns,
  // afterChanged,
  // setAfterChanged,
  // removed,
  // removeAns,
}) => {
  return (
    <Button
      isFirst={ansNum === 1}
      onPress={() => {
        selectAns(ansNum);
      }}
    >
      <Text isSelected={isSelected}>{ansNum}</Text>
    </Button>
  );
};

Ansbtn.propTypes = {
  ansNum: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectAns: PropTypes.func.isRequired,
  // afterChanged: PropTypes.bool.isRequired,
  // setAfterChanged: PropTypes.func.isRequired,
  // removed: PropTypes.bool,
  // removeAns: PropTypes.func.isRequired,
};

export default Ansbtn;
