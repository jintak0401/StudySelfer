import React from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";

const ScrollContainer = ({
  // isTest = false,
  children,
  contentContainerStyle,
  flexValue,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flexGrow: flexValue || 0,
        backgroundColor: "white",
        width: "100%",
        // maxHeight: isTest ? "85%" : "100%",
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
  flexValue: PropTypes.number,
};
