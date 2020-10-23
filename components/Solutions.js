import React, { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import ScrollContainer from "./ScrollContainer";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { screenInfo } from "../utils";

const { isTablet, WIDTH, HEIGHT } = screenInfo;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default ({ questNum, solutionImageUrl }) => {
  const [load, setLoad] = useState(false);
  const [_0, set_0] = useState(0);
  const [_1, set_1] = useState(0);
  const [_2, set_2] = useState(0);
  const [_3, set_3] = useState(0);
  const [_4, set_4] = useState(0);
  const [_5, set_5] = useState(0);
  const [_6, set_6] = useState(0);
  const [_7, set_7] = useState(0);
  const [_8, set_8] = useState(0);
  const [_9, set_9] = useState(0);
  const [_10, set_10] = useState(0);
  const setRatio = [
    set_0,
    set_1,
    set_2,
    set_3,
    set_4,
    set_5,
    set_6,
    set_7,
    set_8,
    set_9,
    set_10,
  ];
  const ratio = [_0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10];
  useEffect(() => {
    if (solutionImageUrl) {
      setLoad(false);
      solutionImageUrl.forEach((url, idx) => {
        setRatio[idx](0);
      });
    }
  }, [solutionImageUrl]);

  useEffect(() => {
    const loading = async () => {
      if (solutionImageUrl) {
        await solutionImageUrl.forEach(async (url, idx) => {
          await Image.getSize(url, (width, height) => {
            setRatio[idx](width / height);
          });
        });
      }
    };
    if (!load) {
      loading();
    }
  }, [load]);

  useEffect(() => {
    if (solutionImageUrl) {
      let tmp = 0;
      solutionImageUrl.forEach((url, idx) => {
        tmp += ratio[idx] ? 1 : 0;
      });
      setLoad(tmp === solutionImageUrl.length);
    }
  }, [_0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10]);

  return (
    <Container>
      {solutionImageUrl && load
        ? solutionImageUrl.map((url, idx) => {
            return (
              <Image
                key={idx}
                style={{
                  width: WIDTH * 0.96,
                  height: undefined,
                  aspectRatio: ratio[idx],
                }}
                source={{ uri: url }}
                resizeMode="cover"
              />
            );
          })
        : null}
    </Container>
    // <ScrollContainer flexValue={flexValue} isTest={isTest}>
    // </ScrollContainer>
  );
};
