import React from "react";
import styled from "styled-components/native";
import { screenInfo, timerFormat } from "../utils";
import PropTypes from "prop-types";

const { isTablet, WIDTH, HEIGHT } = screenInfo;

const Container = styled.View`
  border-radius: 10px;
  width: ${parseInt(0.9 * WIDTH)}px;
  height: ${parseInt(0.6 * HEIGHT)}px;
`;

const Wrapper = styled.View`
  flex: ${(props) => (props.hasSplit ? "12" : "9")};
`;

const TopLine = styled.View`
  flex: ${(props) => (props.inTest ? "13" : "7")};
  flex-direction: row;
  border-style: solid;
  border-color: #4f62c0;
  border-left-width: 2px;
  border-top-width: 2px;
  border-right-width: 2px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const TopText = styled.Text`
  color: #4f62c0;
  margin-left: 20px;
  font-size: ${isTablet ? "30" : "14"}px;
  font-weight: bold;
`;

const SubmitButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

const SubmitText = styled.Text`
  background-color: #4f62c0;
  border-color: #4f62c0;
  color: white;
  border-radius: 100px;
  padding-horizontal: 17px;
  padding-vertical: 10px;
  font-size: ${isTablet ? "30" : "14"}px;
`;

const BottomLine = styled.View`
  flex: 7;
  border-style: solid;
  border-color: #4f62c0;
  border-left-width: 2px;
  border-bottom-width: 2px;
  border-right-width: 2px;
  flex-direction: row;
  background-color: white;
  align-items: center;
  justify-content: flex-end;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const BottomText = styled.Text`
  color: #b7323c;
  margin-horizontal: 20px;
  font-size: ${isTablet ? "27" : "14"}px;
  font-weight: bold;
`;

const SplitBox = styled.View`
  flex: 3;
  background-color: #999999;
  border-style: solid;
  border-color: #4f62c0;
  border-left-width: 2px;
  border-right-width: 2px;
`;

const BoxLineContainer = styled.View`
  flex-direction: row;
  flex: 9;
`;

const BoxContainer = styled.TouchableOpacity`
  flex-direction: row;
  border-width: 2px;
  border-style: solid;
  border-color: #4f62c0;
  flex: 1;
`;

const LeftBox = styled.View`
  background-color: ${(props) =>
    props.isWrong ? "#C04F4F" : props.isBookmarked ? "#4F62C0" : "#A9E4EB"};
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const RightBox = styled.View`
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const LeftText = styled.Text`
  color: ${(props) =>
    props.isBookmarked || props.isWrong ? "white" : "#4F62C0"};
  font-size: ${isTablet ? 30 : 14}px;
`;

const RightText = styled.Text`
  font-size: ${isTablet ? 30 : 14}px;
  color: ${(props) => (props.isWrong ? "#C04F4F" : "#4f62c0")};
`;

const AnswerSheet = ({
  inTest,
  studentAns,
  correctAns,
  bookmarks,
  time,
  setAnswersheetModalVisible,
  changeQuestNum,
  setSubmitModalVisible,
}) => {
  return (
    <Container>
      <TopLine inTest={inTest}>
        <TopText>답안지 및 문제이동</TopText>
        {inTest ? (
          <SubmitButton
            onPress={() => {
              setSubmitModalVisible(true);
              setAnswersheetModalVisible(false);
            }}
          >
            <SubmitText>제출하기</SubmitText>
          </SubmitButton>
        ) : null}
      </TopLine>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Wrapper hasSplit={i !== 5} key={50 * i}>
          <BoxLineContainer>
            {[1, 2, 3, 4, 5].map((j) => (
              <BoxContainer
                key={5 * i + j}
                activeOpacity={0.8}
                onPress={() => {
                  changeQuestNum(5 * i + j);
                  setAnswersheetModalVisible(false);
                }}
              >
                <LeftBox
                  isWrong={
                    !inTest && studentAns[5 * i + j] !== correctAns[5 * i + j]
                  }
                  isBookmarked={bookmarks[5 * i + j]}
                >
                  <LeftText
                    isWrong={
                      !inTest && studentAns[5 * i + j] !== correctAns[5 * i + j]
                    }
                    isBookmarked={bookmarks[5 * i + j]}
                  >
                    {5 * i + j}
                  </LeftText>
                </LeftBox>
                <RightBox>
                  <RightText
                    isWrong={
                      !inTest && studentAns[5 * i + j] !== correctAns[5 * i + j]
                    }
                  >
                    {studentAns[5 * i + j] || ""}
                  </RightText>
                </RightBox>
              </BoxContainer>
            ))}
          </BoxLineContainer>
          {i !== 5 ? <SplitBox /> : null}
        </Wrapper>
      ))}
      <BottomLine>
        <BottomText>풀이 시간</BottomText>
        <BottomText>{timerFormat(time)}</BottomText>
      </BottomLine>
    </Container>
  );
};

AnswerSheet.propTypes = {
  inTest: PropTypes.bool.isRequired,
  studentAns: PropTypes.object.isRequired,
  correctAns: PropTypes.object,
  bookmarks: PropTypes.object.isRequired,
  time: PropTypes.number.isRequired,
  setAnswersheetModalVisible: PropTypes.func.isRequired,
  changeQuestNum: PropTypes.func.isRequired,
  setSubmitModalVisible: PropTypes.func,
};

export default AnswerSheet;
