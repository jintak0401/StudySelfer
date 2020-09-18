import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import ChoiceChapter from "./ChoiceChapter";

export default () => {
  return <ChoiceChapter />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  choicePart: {
    flex: 1,
    flexDirection: "row",
  },
});
