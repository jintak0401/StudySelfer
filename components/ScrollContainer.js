import React from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";

const ScrollContainer = ({
  isTest = false,
  children,
  contentContainerStyle,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: "white",
        maxHeight: isTest ? "85%" : "100%",
      }}
      contentContainerStyle={{
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        ...contentContainerStyle,
      }}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollContainer;

ScrollContainer.protoTypes = {
  children: PropTypes.node.isRequired,
  contentContainerSytle: PropTypes.object,
};
