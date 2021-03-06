import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { screenInfo } from "../utils";
import { CustomBefore, CustomNext } from "../assets/Svg";

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

const MoveQuestBtn = ({
  inTest,
  questNum,
  changeQuestNum,
  endQuestionNum,
  setModalVisible,
}) => {
  const iconSize = isTablet ? 50 : 35;
  const moveQuestIcon = {
    left: "leftcircle",
    right: "rightcircle",
    done: "checkcircle",
  };
  const color = "#A9E4EB";

  return (
    <MoveQuestBtnSet>
      <LeftBtn onPress={() => changeQuestNum(questNum - 1)}>
        {questNum === 1 ? null : (
          <CustomBefore style={{ opacity: 0.7 }} width={45} height={45} />
          // <AntDesign
          //   style={{ opacity: 0.7 }}
          //   name={moveQuestIcon.left}
          //   size={iconSize}
          //   color={color}
          // />
        )}
      </LeftBtn>
      <RightBtn
        onPress={() =>
          questNum === 30 ? setModalVisible(true) : changeQuestNum(questNum + 1)
        }
      >
        {questNum !== (endQuestionNum || 30) ? (
          <CustomNext style={{ opacity: 0.7 }} width={45} height={45} />
        ) : // <AntDesign
        //   style={{ opacity: 0.7 }}
        //   name={moveQuestIcon.right}
        //   size={iconSize}
        //   color={color}
        // />
        inTest ? (
          <AntDesign
            style={{ opacity: 0.7 }}
            name={moveQuestIcon.done}
            size={iconSize}
            color={color}
          />
        ) : null}
      </RightBtn>
    </MoveQuestBtnSet>
  );
};

MoveQuestBtn.propTypes = {
  inTest: PropTypes.bool,
  questNum: PropTypes.number.isRequired,
  changeQuestNum: PropTypes.func.isRequired,
  endQuestionNum: PropTypes.number,
  setModalVisible: PropTypes.func,
};

export default MoveQuestBtn;
