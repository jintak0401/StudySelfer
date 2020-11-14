import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import InfoBox from "./InfoBox";
import Swiper from "react-native-swiper";
import colorset from "../../colorset";
import { resetIsGoBack } from "../../utils";

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ButtonSet = styled.View`
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.isSelected ? colorset.darkPurple : colorset.lightPurple};
  width: 90px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-horizontal: 13px;
`;

const ButtonText = styled.Text`
  font-family: HGG60;
  font-size: 14px;
  color: white;
`;

const CheerupText = styled.Text`
  font-family: HGG60;
  font-size: 18px;
  padding-top: 20px;
`;

const ResultImage = styled.Image`
  width: 80%;
  align-self: center;
  resize-mode: contain;
  margin-top: -100px;
`;

const DiagnoseResult = (props) => {
  const difficulty = ["쉬울 때", "보통일 때", "어려울 때"];
  const [selectedDiff, setSelectedDiff] = useState(1);
  const resultImagePath = [
    { image: require("../../assets/Png/EasyExam.png") },
    { image: require("../../assets/Png/MiddleExam.png") },
    { image: require("../../assets/Png/HardExam.png") },
  ];

  return (
    <Container>
      <ButtonSet>
        {difficulty.map((val, idx) => {
          return (
            <ButtonContainer
              key={idx}
              isSelected={selectedDiff === idx}
              onPress={() => setSelectedDiff(idx)}
            >
              <ButtonText>{val}</ButtonText>
            </ButtonContainer>
          );
        })}
      </ButtonSet>
      <InfoBox>
        <CheerupText>화이팅! 곧 상위등급으로 성장할거에요!</CheerupText>
        <Swiper
          loop={false}
          index={selectedDiff}
          onIndexChanged={(idx) => setSelectedDiff(idx)}
          style={styles.swiper}
          paginationStyle={{ color: colorset.darkPurple }}
          dot={
            <View
              style={{
                backgroundColor: "rgba(96, 47, 218, .2)",
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: colorset.darkPurple,
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
        >
          {[0, 1, 2].map((val) => (
            <ResultImage key={val} source={resultImagePath[val].image} />
          ))}
        </Swiper>
      </InfoBox>
    </Container>
  );
};

const styles = StyleSheet.create({
  swiper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
});

export default DiagnoseResult;
