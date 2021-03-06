import React, { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components/native";
import Questions from "../components/Questions";
import ScrollContainer from "../components/ScrollContainer";
import QuestSummary from "../components/QuestComment/QuestSummary";
import Collapsible from "react-native-collapsible";
import Dash from "react-native-dash";
import { AntDesign } from "@expo/vector-icons";
import Solutions from "../components/Solutions";
import PropTypes from "prop-types";

const Container = styled.View`
  flex: 1;
  background-color: white;
  ${(props) => props.needMarginTop && "margin-top: 110px"};
`;

const CollapseButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 65px;
  background-color: white;
  margin-bottom: 20px;
  ${(props) => props.isSolution && `margin-top: 20px`};
`;

const CollapseText = styled.Text`
  text-align: center;
  padding-right: 5px;
  font-size: 16px;
  color: #4f62c0;
  padding-left: 6px;
  font-family: HGG60;
`;

const FoldDirection = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const Comment = ({
  questNum,
  studentAns,
  correctAns,
  questData,
  solutions,
  isChoice,
  needMarginTop,
}) => {
  const [questCollapsed, setQuestCollapsed] = useState(false);
  const [solutionCollapsed, setSolutionCollapsed] = useState(false);
  const [questDirection, setQuestDirection] = useState(new Animated.Value(0));
  const [solutionDirection, setSolutionDirection] = useState(
    new Animated.Value(0)
  );
  const questRotate = questDirection.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });
  const solutionRotate = solutionDirection.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  useEffect(() => {
    setQuestCollapsed(false);
    setSolutionCollapsed(false);
  }, [questNum]);

  useEffect(() => {
    Animated.timing(questDirection, {
      toValue: questCollapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.easeInOutCubic,
    }).start();
  }, [questCollapsed]);
  useEffect(() => {
    Animated.timing(solutionDirection, {
      toValue: solutionCollapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [solutionCollapsed]);

  return (
    <Container needMarginTop={needMarginTop}>
      <QuestSummary
        questNum={questNum}
        studentAns={studentAns}
        correctAns={correctAns}
        isChoice={isChoice}
        isInTest={true}
      />
      <ScrollContainer>
        <Wrapper>
          <Dash
            style={{
              position: "absolute",
              top: 10,
              width: 360,
              height: 1,
            }}
            dashGap={3}
            dashLength={5}
            dashThickness={1}
            dashColor={"#999999"}
          />
          <CollapseButton
            activeOpacity={1}
            onPress={() => setQuestCollapsed(!questCollapsed)}
          >
            <CollapseText>문제</CollapseText>
            <FoldDirection style={{ transform: [{ rotate: questRotate }] }}>
              <AntDesign name="up" size={20} color="#4F62C0" />
            </FoldDirection>
          </CollapseButton>
          <Collapsible collapsed={questCollapsed}>
            <Questions questData={questData} />
          </Collapsible>
        </Wrapper>
        <Wrapper>
          <Dash
            style={{
              position: "relative",
              width: 360,
              height: 1,
              top: 32,
            }}
            dashGap={3}
            dashLength={5}
            dashThickness={1}
            dashColor={"#999999"}
          />
          <CollapseButton
            isSolution={true}
            activeOpacity={1}
            onPress={() => setSolutionCollapsed(!solutionCollapsed)}
          >
            <CollapseText>해설</CollapseText>
            <FoldDirection style={{ transform: [{ rotate: solutionRotate }] }}>
              <AntDesign name="up" size={20} color="#4F62C0" />
            </FoldDirection>
          </CollapseButton>
          <Collapsible collapsed={solutionCollapsed}>
            <Solutions solutionImageUrl={solutions} />
          </Collapsible>
        </Wrapper>
      </ScrollContainer>
    </Container>
  );
};

Comment.propTypes = {
  questNum: PropTypes.number.isRequired,
  studentAns: PropTypes.number,
  correctAns: PropTypes.number.isRequired,
  questData: PropTypes.object.isRequired,
  solutions: PropTypes.array.isRequired,
  isChoice: PropTypes.bool.isRequired,
};

export default Comment;
