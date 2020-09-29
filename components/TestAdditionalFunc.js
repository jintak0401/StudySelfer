import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const TestAdditionalFunc = ({ funcName, isActive, setActive, questNum }) => {
  const iconName = `${funcName}-outline`;
  const iconSize = 0.045 * HEIGHT;
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
        size={iconSize}
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
    paddingHorizontal: WIDTH * 0.018,
  },
});
