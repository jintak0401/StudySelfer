import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { screenInfo } from "../utils";

const { isTablet, HEIGHT } = screenInfo;

const MoveQuestBtnSet = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: ${parseInt(HEIGHT * 0.12)}px;
  justify-content: space-between;
  width: 100%;
`;

const RightBtn = styled.TouchableOpacity`
  margin-right: 10px;
`;

const LeftBtn = styled.TouchableOpacity`
  margin-left: 10px;
`;

const NextAndDontKnow = ({ goToNext, dontKnow, setDontKnow }) => {
  const iconSize = isTablet ? 50 : 35;
  const iconName = {
    left: "questioncircle",
    right: "rightcircle",
  };
  const iconColor = {
    dontKnow: "#4F62C0",
    know: "#A9E4EB",
    next: "#EA726C",
  };

  return (
    <MoveQuestBtnSet>
      <LeftBtn onPress={() => setDontKnow(!dontKnow)}>
        <AntDesign
          style={{ opacity: 0.7 }}
          name={iconName.left}
          size={iconSize}
          color={dontKnow ? iconColor.dontKnow : iconColor.know}
        />
      </LeftBtn>
      <RightBtn onPress={() => goToNext()}>
        <AntDesign
          style={{ opacity: 0.7 }}
          name={iconName.right}
          size={iconSize}
          color={iconColor.next}
        />
      </RightBtn>
    </MoveQuestBtnSet>
  );
};

NextAndDontKnow.propTypes = {
  goToNext: PropTypes.func.isRequired,
  dontKnow: PropTypes.bool.isRequired,
  setDontKnow: PropTypes.func.isRequired,
};

export default NextAndDontKnow;
