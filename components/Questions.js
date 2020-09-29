import React, { useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
  Text,
} from "react-native";
import ScrollContainer from "./ScrollContainer";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const falseArr = [false, false, false, false, false];

export default ({ questNum, questData, isTest }) => {
  const [ratio, setRatio] = useState(1);
  useLayoutEffect(() => {
    if (questData) {
      Image.getSize(questData.questImageUrl, (width, height) => {
        setRatio(width / height);
      });
    }
  }, [questData]);
  return (
    <ScrollContainer isTest={isTest}>
      {questData ? (
        <Image
          style={{ width: WIDTH * 0.9, height: undefined, aspectRatio: ratio }}
          source={{ uri: questData.questImageUrl }}
          resizeMode="cover"
        />
      ) : (
        <Text>questNum</Text>
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
