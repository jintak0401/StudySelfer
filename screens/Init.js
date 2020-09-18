import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("진단평가")}
    >
      <Text style={styles.font}>진단평가</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("추천문제")}
    >
      <Text style={styles.font}>추천문제</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("모의수능 및 모의고사")}
    >
      <Text style={styles.font}>모의수능 및 모의평가</Text>
    </TouchableOpacity>
  </View>
);

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "skyblue",
    paddingHorizontal: 10,
    margin: 20,
    padding: 50,
  },
  font: {
    fontSize: 20,
  },
};
