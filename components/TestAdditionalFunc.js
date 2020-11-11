import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { screenInfo } from "../utils";

const { isTablet, WIDTH } = screenInfo;

const TestAdditionalFunc = ({ funcName, isActive, setActive, questNum }) => {
  const iconName = `${funcName}-outline`;
  const iconSize = isTablet ? 45 : 30;
  const color = isActive ? "#4F62C0" : "#CCCCCC";
  return (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => {
        setActive(questNum);
      }}
    >
      <MaterialCommunityIcons
        name={funcName === "bookmark" && isActive ? "bookmark" : iconName}
        size={iconSize}
        color={color}
      />
    </TouchableOpacity>
  );
};

TestAdditionalFunc.propTypes = {
  funcName: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  setActive: PropTypes.func.isRequired,
  questNum: PropTypes.number,
};

export default TestAdditionalFunc;

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: WIDTH * 0.018,
  },
});
