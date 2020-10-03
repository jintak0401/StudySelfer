import React, { useState, useEffect } from "react";
import { Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./navigation/Stack";
import { fonts } from "./src/Fonts";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts(fonts);
  return loaded ? (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar backgroundColor="#6c63ff" barStyle="light-content" />
    </>
  ) : null;
}
