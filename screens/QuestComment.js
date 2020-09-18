import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default () => (
  <View style={styles.container}>
    <View style={{ ...styles.box, flex: 1 }}>
      <Text>선택내용</Text>
    </View>
    <View style={{ ...styles.box, flex: 3 }}>
      <Text>문제</Text>
    </View>
    <View style={{ ...styles.box, flex: 3 }}>
      <Text>해설</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    borderBottomWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
