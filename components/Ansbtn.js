import React from "react";
import { View, Button } from "react-native";

const Ansbtn = (props) => {
  const { ansNum, isSelected, selectAns } = props;
  return (
    <View style={{ flex: 1 }}>
      <Button
        color={isSelected ? "blue" : "gray"}
        title={`${ansNum}`}
        onPress={() => selectAns(ansNum)}
      />
    </View>
  );
};

export default Ansbtn;
