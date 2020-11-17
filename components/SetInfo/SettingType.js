import React from "react";
import styled from "styled-components/native";
import colorset from "../../colorset";

const Container = styled.View`
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
`;

const ImageLine = styled.View`
  width: 100%;
  height: 100px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  font-family: HGG80;
  font-size: 20px;
  color: ${colorset.lightBlue};
  align-self: flex-start;
  margin-left: 30px;
  margin-bottom: -10px;
`;

const GradeImage = styled.Image`
  height: 62px;
  aspect-ratio: 2.6692;
`;

const ImageContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-horizontal: 15px;
`;

export default ({ type, setType }) => {
  const images = {
    liberty: require("../../assets/Png/liberty.png"),
    libertyActive: require("../../assets/Png/libertyActive.png"),
    natural: require("../../assets/Png/natural.png"),
    naturalActive: require("../../assets/Png/naturalActive.png"),
  };
  return (
    <Container>
      <TitleText>문이과 선택</TitleText>
      <ImageLine>
        <ImageContainer onPress={() => setType("liberty")}>
          <GradeImage
            source={images["liberty" + (type === "liberty" ? "Active" : "")]}
          />
        </ImageContainer>
        <ImageContainer onPress={() => setType("natural")}>
          <GradeImage
            source={images["natural" + (type === "natural" ? "Active" : "")]}
          />
        </ImageContainer>
      </ImageLine>
    </Container>
  );
};
