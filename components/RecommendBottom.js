import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import {
  getRecommendContinuity,
  getRecommendData,
  getTodayDateKey,
  solvedData,
} from "../solvedData";

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 150px;
  border-radius: 30px;
  margin-top: 30px;
`;

const BackImage = styled.ImageBackground`
  align-items: center;
  padding-top: 20px;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const DateText = styled.Text`
  color: #4f62c0;
  text-align: left;
  align-self: stretch;
  margin-left: 25px;
`;

const ContentText = styled.Text`
  color: #4f62c0;
  font-weight: bold;
  font-size: ${(props) => (props.upLine ? 28 : 23)}px;
  ${(props) => props.upLine && "margin-top: 7px"};
`;

const RecommendBottom = ({ goBackTodayRecommend, todayDone }) => {
  const [monthKey, dayKey] = getTodayDateKey();
  const path = todayDone
    ? require("../assets/Png/DoneRecommend.png")
    : require("../assets/Png/TodayRecommendButton.png");
  const date = `${monthKey.slice(0, 2)}.${monthKey.slice(2)}.${dayKey}`;

  return (
    <ButtonContainer
      activeOpacity={0.7}
      disabled={todayDone}
      onPress={goBackTodayRecommend}
    >
      <BackImage source={path}>
        {todayDone && (
          <>
            <DateText>{date}</DateText>
            <ContentText upLine>
              연속 {getRecommendContinuity()}일차
            </ContentText>
            <ContentText>추천문제 풀이완료!</ContentText>
          </>
        )}
      </BackImage>
    </ButtonContainer>
  );
};

RecommendBottom.propTypes = {
  goBackTodayRecommend: PropTypes.func.isRequired,
  todayDone: PropTypes.bool,
};

export default RecommendBottom;
