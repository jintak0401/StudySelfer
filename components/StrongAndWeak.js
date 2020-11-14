import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.View`
  width: 100%;
  height: 240px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SubContainer = styled.ScrollView`
  flex-direction: row;
  width: 100%;
  height: 300px;
`;

const ContentContainer = styled.View`
  height: 100%;
  background-color: tomato;
  margin-horizontal: 5px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: ${(props) => (props.isStrong ? "#4F62C0" : "#EA726C")};
  align-self: flex-start;
  margin-left: 30px;
  margin-vertical: 20px;
`;

const ContentBox = styled.View`
  height: 60px;
  width: 100%;
  background-color: ${(props) => (props.isStrong ? "#A9E4EB" : "tomato")};
  align-items: center;
  justify-content: center;
`;

const ContentTitle = styled.Text`
  font-size: 18px;
  color: black;
`;

const ContentText = styled.Text`
  color: ${(props) => (props.isStrong ? "#4F62C0" : "white")};
  font-size: 23px;
  font-weight: bold;
`;

const RankText = styled.Text`
  color: ${(props) => (props.isStrong ? "#4F62C0" : "white")};
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 18px;
  left: 27px;
`;

const Box = styled.ImageBackground`
  width: 220px;
  height: 160px;
  margin-horizontal: 5px;
  justify-content: center;
  align-items: center;
`;

const StrongAndWeak = ({ contents, isStrong }) => {
  const src = {
    Strong1: require("../assets/Png/Strong1.png"),
    Strong2: require("../assets/Png/Strong2.png"),
    Strong3: require("../assets/Png/Strong3.png"),
    Weak1: require("../assets/Png/Weak1.png"),
    Weak2: require("../assets/Png/Weak2.png"),
    Weak3: require("../assets/Png/Weak3.png"),
  };
  return (
    <Container isWeak={!isStrong}>
      <Title isStrong={isStrong}>
        {isStrong ? `내가 강한 단원` : `내가 약한 단원`}
      </Title>
      <SubContainer
        contentContainerStyle={{
          flex: 0,
          paddingHorizontal: 20,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        {contents.map((val, idx) => {
          const path = src[isStrong ? `Strong${idx + 1}` : `Weak${idx + 1}`];
          return (
            <Box key={idx} source={path}>
              <RankText isStrong={isStrong}>TOP {idx + 1}</RankText>
              <ContentText isStrong={isStrong}>{val}</ContentText>
            </Box>
          );
        })}
      </SubContainer>
    </Container>
  );
};

export default StrongAndWeak;

StrongAndWeak.propTypes = {
  contents: PropTypes.array.isRequired,
};
