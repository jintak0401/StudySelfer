import React from "react";
import styled from "styled-components/native";
import colorset from "../../colorset";

const Container = styled.View`
  width: 100%;
  height: 500px;
  justify-content: center;
  align-items: center;
`;

const ImageLine = styled.View`
  flex-direction: row;
`;

const TitleText = styled.Text`
  font-family: HGG80;
  font-size: 20px;
  color: ${colorset.lightBlue};
`;

const GradeImage = styled.Image`
  width: 35%;
  height: 0.9854;
`;

const ImageContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export default ({ grade, setGrade }) => {
  const images = {
    _1active: require("../../assets/Png/grade1Active.png"),
    _1: require("../../assets/Png/grade1.png"),
    _2active: require("../../assets/Png/grade2Active.png"),
    _2: require("../../assets/Png/grade2.png"),
    _3active: require("../../assets/Png/grade3Active.png"),
    _3: require("../../assets/Png/grade3.png"),
    _4active: require("../../assets/Png/grade4Active.png"),
    _4: require("../../assets/Png/grade4.png"),
  };
  return (
    <Container>
      <ImageLine>
        <ImageContainer>
          <GradeImage source={images["_1" + (grade === 1 ? "active" : "")]} />
        </ImageContainer>
        <ImageContainer>
          <GradeImage source={images["_2" + (grade === 2 ? "active" : "")]} />
        </ImageContainer>
      </ImageLine>
      <ImageLine>
        <ImageContainer>
          <GradeImage source={images["_3" + (grade === 3 ? "active" : "")]} />
        </ImageContainer>
        <ImageContainer>
          <GradeImage source={images["_4" + (grade === 4 ? "active" : "")]} />
        </ImageContainer>
      </ImageLine>
    </Container>
  );
};
