import React from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import colorset from "../../colorset";

const Container = styled.View`
  width: 100%;
  height: 170px;
  margin-top: 80px;
`;

const GoButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const ButtonImage = styled.Image`
  height: 230px;
  aspect-ratio: 1.5957;
`;

export default ({ goToRecommend }) => {
  return (
    <Container>
      <View
        style={{
          alignSelf: "center",
          height: 16,
          backgroundColor: colorset.skyblue,
          marginBottom: 6,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            marginTop: -10,
            fontSize: 20,
            fontFamily: "HGG80",
            color: colorset.lightBlue,
          }}
        >
          한진탁님의 수학 실력에 대한 분석 결과에요
        </Text>
      </View>
      <Text
        style={{
          alignSelf: "center",
          color: colorset.darkGray,
          fontFamily: "HGG60",
          fontSize: 16,
        }}
      >
        분석결과에 따른 튜터의 추천문제가 준비되어있어요
      </Text>
      <GoButton activeOpacity={0.8} onPress={() => goToRecommend()}>
        <ButtonImage source={require("../../assets/Png/GoToRecommend.png")} />
      </GoButton>
    </Container>
  );
};
