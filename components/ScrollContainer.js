import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "react-native";

const ScrollContainer = ({
  // isTest = false,
  children,
  contentContainerStyle,
  flexValue,
  footer,
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
      {footer && (
        <View style={{ height: footer || 0, backgroundColor: "white" }} />
      )}
    </ScrollView>
  );
};

export default ScrollContainer;

ScrollContainer.protoTypes = {
  children: PropTypes.node.isRequired,
  contentContainerSytle: PropTypes.object,
  flexValue: PropTypes.number,
  footer: PropTypes.number,
};
