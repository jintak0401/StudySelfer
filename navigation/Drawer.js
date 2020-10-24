import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Init from "../screens/Init";
import Tmp from "../screens/tmp";
import Stack from "./Stack";
import { AntDesign } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default ({ props }) => {
  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerPosition="right"
      navigationOptions={{ drawerLockMode: "locked-close" }}
      drawerStyle={{
        width: 240,
      }}
    >
      <Drawer.Screen
        name="홈"
        component={Stack}
        options={{
          drawerIcon: () => (
            <AntDesign
              style={{ marginRight: -10 }}
              name="home"
              size={30}
              color="gray"
            />
          ),
          drawerLabel: "홈 화면",
        }}
      />
      <Drawer.Screen
        name="진탁2"
        component={Tmp}
        options={{
          drawerLabel: "진탁2",
        }}
      />
      <Drawer.Screen
        name="진탁"
        component={Init}
        options={{
          drawerLabel: "진탁1",
          drawerIcon: () => {
            <AntDesign name="upcircle" size={24} color="gray" />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};
