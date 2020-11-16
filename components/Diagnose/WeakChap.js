import React from "react";
import styled from "styled-components/native";
import { Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { screenInfo } from "../../utils";

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

export default WeakChap = ({ style }) => {
  const img = {
    1: require("../../assets/Png/WeakChap1.png"),
    2: require("../../assets/Png/WeakChap2.png"),
    3: require("../../assets/Png/WeakChap3.png"),
  };
  return (
    <Container style={{ ...style }}>
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
    backgroundColor: "black",
  },
});
