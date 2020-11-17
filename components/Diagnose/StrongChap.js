import React from "react";
import styled from "styled-components/native";
import { Image, StyleSheet, Text } from "react-native";
import Swiper from "react-native-swiper";
import { screenInfo } from "../../utils";
import colorset from "../../colorset";

const { HEIGHT, WIDTH } = screenInfo;

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ChapterImage = styled.Image`
  width: 90%;
  height: ${WIDTH * 0.9 * 0.7}px;
  resize-mode: contain;
  align-self: center;
`;

export default StrongChap = ({ style }) => {
  const img = {
    1: require("../../assets/Png/StrongChap1.png"),
    2: require("../../assets/Png/StrongChap2.png"),
    3: require("../../assets/Png/StrongChap3.png"),
  };
  return (
    <Container style={{ ...style }}>
      <Text
        style={{
          color: colorset.emerald,
          fontSize: 24,
          fontFamily: "HGG80",
          alignSelf: "flex-start",
          marginLeft: 45,
          marginVertical: 10,
        }}
      >
        내가 강한 유형 TOP3
      </Text>
      <Swiper loop={false} style={styles.swiper} showsPagination={false}>
        {[1, 2, 3].map((val) => (
          <ChapterImage key={val} source={img[val]} />
        ))}
      </Swiper>
    </Container>
  );
};

const styles = StyleSheet.create({
  swiper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: "80%",
    height: WIDTH * 0.8 * 0.6265,
    resizeMode: "contain",
  },
});
