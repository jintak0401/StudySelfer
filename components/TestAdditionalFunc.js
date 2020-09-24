import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const TestAdditionalFunc = ({ funcName, isActive, setActive, questNum }) => {
  const iconName = `${funcName}-outline`;
  let color = "gray";
  return (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => {
        if (funcName === "clock" || funcName === "bookmark")
          setActive(questNum);
      }}
    >
      <MaterialCommunityIcons
        name={funcName === "bookmark" && isActive ? "bookmark" : iconName}
        size={30}
        color={isActive ? "blue" : "gray"}
      />
    </TouchableOpacity>
  );
};

TestAdditionalFunc.propTypes = {
  funcName: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  setActive: PropTypes.func,
};

export default TestAdditionalFunc;

const styles = StyleSheet.create({
  icon: {
    padding: 5,
  },
});
