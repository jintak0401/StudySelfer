import React, { useState } from "react";
import { Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./navigation/Stack";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </>
  );
}
