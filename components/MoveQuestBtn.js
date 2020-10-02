import React, { useEffect } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { screenInfo } from "../utils";

const { isTablet, WIDTH, HEIGHT } = screenInfo;

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
  time,
  goToResult,
}) => {
  const navigation = useNavigation();
  const iconSize = isTablet ? 50 : 35;
  const moveQuestIcon = {
    left: "leftcircle",
    right: "rightcircle",
    done: "checkcircle",
  };
  const color = "#A9E4EB";
  useEffect(() => {
    if (time === 6004 && inTest) goToResult();
  }, [time]);

  return (
    <MoveQuestBtnSet>
      <LeftBtn onPress={() => changeQuestNum(questNum - 1)}>
        {questNum === 1 ? null : (
          <AntDesign
            style={{ opacity: 0.7 }}
            name={moveQuestIcon.left}
            size={iconSize}
            color={color}
          />
        )}
      </LeftBtn>
      <RightBtn
        onPress={() =>
          questNum === 30 ? goToResult() : changeQuestNum(questNum + 1)
        }
      >
        {questNum !== 30 ? (
          <AntDesign
            style={{ opacity: 0.7 }}
            name={moveQuestIcon.right}
            size={iconSize}
            color={color}
          />
        ) : inTest ? (
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
  inTest: PropTypes.bool.isRequired,
  questNum: PropTypes.number.isRequired,
  changeQuestNum: PropTypes.func.isRequired,
  time: PropTypes.number,
  questData: PropTypes.object,
  studentAns: PropTypes.object,
  goToResult: PropTypes.func,
};

export default MoveQuestBtn;
