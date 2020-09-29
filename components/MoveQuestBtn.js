import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const MoveQuestBtnSet = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: ${HEIGHT * 0.12};
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
  questData,
  studentAns,
}) => {
  const navigation = useNavigation();
  const iconSize = 0.07 * WIDTH;
  const moveQuestIcon = {
    left: "leftcircle",
    right: "rightcircle",
    done: "checkcircle",
  };
  return (
    <MoveQuestBtnSet>
      <LeftBtn onPress={() => changeQuestNum(questNum - 1)}>
        {questNum === 1 ? null : (
          <AntDesign name={moveQuestIcon.left} size={iconSize} color="skyblue" />
        )}
      </LeftBtn>
      <RightBtn
        onPress={() =>
          questNum === 30
            ? navigation.navigate("모의시험 결과", {
                time: time,
                questData,
                studentAns: studentAns,
              })
            : changeQuestNum(questNum + 1)
        }
      >
        {questNum !== 30 ? (
          <AntDesign name={moveQuestIcon.right} size={iconSize} color="skyblue" />
        ) : inTest ? (
          <AntDesign name={moveQuestIcon.done} size={iconSize} color="skyblue" />
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
};

export default MoveQuestBtn;
