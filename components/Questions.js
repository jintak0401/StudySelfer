import React, { useEffect, useState } from "react";
import { StyleSheet, Image, ScrollView, Text } from "react-native";
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

export default ({ questNum, questData, isTest, flexValue }) => {
  const [load, setLoad] = useState(false);
  const [_0, set_0] = useState(0);
  const [_1, set_1] = useState(0);
  const [_2, set_2] = useState(0);
  const setRatio = [set_0, set_1, set_2];
  const ratio = [_0, _1, _2];
  const [num, setNum] = useState(0);
  useEffect(() => {
    if (questData) {
      // setNum(0);
      setLoad(false);
    }
  }, [questData]);

  useEffect(() => {
    const loading = () => {
      if (questData) {
        questData.questImageUrl.forEach(async (url, idx) => {
          await Image.getSize(url, (width, height) => {
            setRatio[idx](0);
            setRatio[idx](width / height);
          });
        });
        setLoad(true);
      }
    };
    if (!load) {
      // loading().then(() => setNum((prev) => prev + 1));
      loading();
    }
  }, [load]);

  // useEffect(() => {
  //   if (questData) {
  //     setLoad(num === questData.questImageUrl.length);
  //   }
  // }, [num]);

  return (
    <Container>
      {questData && load
        ? questData.questImageUrl.map((url, idx) => {
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
  );
};
