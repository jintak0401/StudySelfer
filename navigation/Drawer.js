import React, { useEffect } from "react";
import { ToastAndroid, BackHandler } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Stack from "./Stack";
import ChoiceChapter from "../screens/ChoiceChapter";
import Recommend from "../screens/Recommend";
import Test from "../screens/Test";

const Drawer = createDrawerNavigator();

export default (props) => {
  let currentCount = 0;
  const msg = "한 번 더 누르면 종료됩니다";
  const onBackPress = () => {
    if (currentCount < 1) {
      currentCount += 1;
      ToastAndroid.showWithGravity(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      BackHandler.exitApp();
    }
    setTimeout(() => {
      currentCount = 0;
    }, 2000);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);

  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerPosition="right"
      drawerStyle={{
        width: 240,
      }}
    >
      <Drawer.Screen
        name="홈"
        component={Stack}
        options={{
          drawerLabel: "홈 화면",
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="진단평가"
        component={ChoiceChapter}
        options={{
          drawerLabel: "진단평가",
        }}
      />
      <Drawer.Screen
        name="추천문제"
        component={Recommend}
        options={{
          drawerLabel: "추천문제",
        }}
      />
      <Drawer.Screen
        name="모의고사"
        component={Test}
        options={{
          drawerLabel: "모의고사",
        }}
      />
    </Drawer.Navigator>
  );
};
