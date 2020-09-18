import { useLinkProps } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const falseArr = [false, false, false, false, false];

export default ({ questNum, data }) => {
  return (
    <View style={styles.container}>
      {data ? (
        <Image
          style={{ width: WIDTH, height: HEIGHT }}
          source={{ uri: data.questImageUrl }}
          resizeMode="contain"
        />
      ) : (
        <Text style={styles.text}>{questNum}</Text>
      )}
    </View>
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
