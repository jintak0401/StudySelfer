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

export default ({ questData, questNum }) => {
  const [load, setLoad] = useState(false);
  const [_0, set_0] = useState(0);
  const [_1, set_1] = useState(0);
  const [_2, set_2] = useState(0);
  const setRatio = [set_0, set_1, set_2];
  const ratio = [_0, _1, _2];
  useEffect(() => {
    if (questData) {
      setLoad(false);
    }
  }, [questData]);

  useEffect(() => {
    const loading = async () => {
      if (questData) {
        await questData.forEach(async (url, idx) => {
          await Image.getSize(url, (width, height) => {
            setRatio[idx](width / height);
          });
        });
      }
    };
    if (!load) {
      loading().then(() => setLoad(true));
    }
  }, [load]);

  return (
    <Container>
      {questData && load
        ? questData.map((url, idx) => {
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
