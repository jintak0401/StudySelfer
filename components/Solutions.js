import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { screenInfo } from "../utils";

const { WIDTH } = screenInfo;

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
      loading().then(() => setLoad(true));
    }
  }, [load]);

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
  );
};
