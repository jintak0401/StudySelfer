import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components/native";
import colorset from "../../colorset";

const Container = styled.View`
  width: 100%;
`;

const TitleText = styled.Text`
  font-family: HGG80;
  font-size: 20px;
  margin-left: 30px;
`;

const ValueContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: 185px;
  padding-top: 20px;
`;

//   margin-top: -45px;
const ValueText = styled.Text`
  font-family: HGG80;
  font-size: ${(props) => (props.hasValue ? 115 : 60)}px;
  color: ${(props) => props.color};
  margin-top: ${(props) => (props.hasValue ? -120 : -70)}px;
`;

const ValueBackground = styled.View`
  height: 12px;
  background-color: ${(props) => props.color};
  margin-horizontal: 10px;
`;

const SubContainer = styled.View``;

const ValueSideText = styled.Text`
  font-family: HGG60;
  font-size: 35px;
  color: ${(props) => props.color};
  margin-top: 80px;
`;

export default ({ subject }) => {
  const [value, setValue] = useState({
    math1: 3.1,
    math2: 47.6,
    calculus: 44.2,
    statistic: "데이터 부족",
  });
  const [color, setColor] = useState(colorset.emerald);
  const leftPos = { math1: 90, math2: 130, calculus: 130 };
  const rightPos = { math1: 50, math2: 90, calculus: 90 };

  const settingColor = () => {
    if (0 <= value[subject] && value[subject] < 30) {
      setColor(colorset.emerald);
    } else if (30 <= value[subject] && value[subject] < 40) {
      setColor(colorset.yellow);
    } else if (40 <= value[subject]) {
      setColor(colorset.cherry);
    } else {
      setColor(colorset.darkGray);
    }
  };

  useEffect(() => {
    settingColor();
  }, [subject]);

  return (
    <Container>
      <TitleText>단원별 실력</TitleText>
      {/* <SubContainer> */}
      <ValueContainer>
        {!isNaN(value[subject]) && (
          <ValueSideText
            style={{ position: "relative", right: leftPos[subject] }}
            color={color}
          >
            상위
          </ValueSideText>
        )}
        <ValueBackground
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: 30,
          }}
          color={color}
        >
          <ValueText hasValue={!isNaN(value[subject])} color={color}>
            {value[subject]}
          </ValueText>
        </ValueBackground>
        {!isNaN(value[subject]) && (
          <ValueSideText
            style={{ position: "relative", left: rightPos[subject] }}
            color={color}
          >
            %
          </ValueSideText>
        )}
      </ValueContainer>
      {/* </SubContainer> */}
    </Container>
  );
};
