import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Image, ScrollView, Text } from "react-native";
import ScrollContainer from "./ScrollContainer";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { screenInfo } from "../utils";

const { isTablet, WIDTH, HEIGHT } = screenInfo;

const falseArr = [false, false, false, false, false];

export default ({ questNum, questData, isTest, flexValue }) => {
  const [ratio, setRatio] = useState(1);
  const [load, setLoad] = useState(false);
  useLayoutEffect(() => {
    setLoad(false);
    const loading = async () => {
      if (questData) {
        await Image.getSize(questData.questImageUrl, (width, height) => {
          setRatio(width / height);
        });
        setLoad(true);
      }
    };
    loading();
  }, [questData]);
  return (
    <ScrollContainer flexValue={flexValue} isTest={isTest}>
      {questData && load ? (
        <Image
          style={{ width: WIDTH * 0.9, height: undefined, aspectRatio: ratio }}
          source={{ uri: questData.questImageUrl }}
          resizeMode="cover"
        />
      ) : (
        <Text></Text>
      )}
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    justifyContent: "center",
    alignContent: "center",
    fontSize: 50,
  },
});
