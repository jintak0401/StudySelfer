import React from "react";
import PropTypes from "prop-types";
import { ScrollView } from "react-native";

const ScrollContainer = ({ children, contentContainerStyle }) => {
  return (
    <ScrollView
      style={{ backgroundColor: "white", maxHeight: "85%" }}
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
