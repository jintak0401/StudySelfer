import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Strong1, Strong2, Strong3, Weak1, Weak2, Weak3 } from "../assets/Svg";

const Container = styled.View`
  width: 100%;
  height: 130px;
  justify-content: center;
  align-items: center;
  margin-vertical: 20px;
  ${(props) => props.isWeak && "margin-bottom : 30px"};
`;

const SubContainer = styled.View`
  flex-direction: row;
`;

const ContentContainer = styled.View`
  flex: 1;
  margin-horizontal: 5px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: black;
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
  color: black;
  font-size: 13px;
  font-family: Ssangmoon;
  font-weight: bold;
`;

const StrongAndWeak = ({ contents, isStrong }) => {
  const box = isStrong ? [Strong1, Strong2, Strong3] : [Weak1, Weak2, Weak3];
  return (
    <Container isWeak={!isStrong}>
      <Title>{isStrong ? `내가 강한 단원` : `내가 약한 단원`} TOP3</Title>
      <SubContainer>
        {contents.map((val, idx) => {
          const Box = box[idx];
          return (
            <ContentContainer key={idx}>
              <Box width={"100%"} height={"100%"}>
                <ContentTitle>Top {idx + 1}</ContentTitle>
                <ContentBox isStrong={isStrong}>
                  <ContentText>{val}</ContentText>
                </ContentBox>
              </Box>
            </ContentContainer>
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
