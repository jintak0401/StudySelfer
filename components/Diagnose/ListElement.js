import React from "react";
import styled from "styled-components/native";
import Dash from "react-native-dash";
import colorset from "../../colorset";

const Container = styled.View`
  width: 100%;
`;

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
`;

const NameText = styled.Text`
  font-family: HGG60;
  font-size: 17px;
`;

const DataText = styled.Text`
  font-family: HGG60;
  font-size: 17px;
  color: ${(props) => props.color};
`;

export default ({ name, data }) => {
  const showData = data ? `상위 ${data}%` : "데이터 부족";
  const settingColor = () => {
    if (0 <= data && data < 30) {
      return colorset.emerald;
    } else if (30 <= data && data < 40) {
      return colorset.yellow;
    } else if (40 <= data) {
      return colorset.cherry;
    } else {
      return colorset.darkGray;
    }
  };
  const color = settingColor();

  return (
    <Container>
      <TextContainer>
        <NameText>{name}</NameText>
        <DataText color={color}>{showData}</DataText>
      </TextContainer>
      <Dash
        style={{ position: "absolute", bottom: 0, width: "100%", height: 1 }}
        dashGap={3}
        dashLength={5}
        dashThickness={1}
        dashColor={colorset.lightGray}
      />
    </Container>
  );
};
