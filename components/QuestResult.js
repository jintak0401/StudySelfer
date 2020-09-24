import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
// import QuestComment from "./QuestComment";

export default (props) => {
  const { questNum, selAns, corAns, navigation } = props;
  const nums = ["①", "②", "③", "④", "⑤"];
  return (
    <View style={styles.container}>
      <Text style={{ color: "blue", fontWeight: "bold" }}>{questNum}번</Text>
      {selAns !== corAns ? (
        <>
          <Text style={{ color: "red", fontSize: 20 }}>{nums[selAns - 1]}</Text>
          <Text style={{ color: "blue", fontSize: 20 }}>
            {nums[corAns - 1]}
          </Text>
        </>
      ) : (
        <></>
      )}
      <Button
        buttonStyle={{ borderRadius: 100 }}
        title="해설보기"
        onPress={() => navigation.navigate("해설", { qNum: questNum })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    width: "100%",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "gray",
  },
});
