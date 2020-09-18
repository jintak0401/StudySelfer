import React from "react";
import {
  HeaderBackButton,
  createStackNavigator,
} from "@react-navigation/stack";
import Evaluation from "../screens/Evaluation";
import Recommend from "../screens/Recommend";
import Test from "../screens/Test";
import Init from "../screens/Init";
import TestQuestions from "../screens/TestQuestions";
import TestResult from "../screens/TestResult";
import QuestComment from "../screens/QuestComment";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default ({ navigation }) => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      headerStyle: {
        backgroundColor: "blue",
        // height: 50,
      },
      headerTintColor: "white",
      headerBackTitleVisible: false,
    }}
  >
    <Stack.Screen name="초기화면" component={Init} />
    <Stack.Screen name="진단평가" component={Evaluation} />
    <Stack.Screen name="추천문제" component={Recommend} />
    <Stack.Screen name="모의수능 및 모의고사" component={Test} />
    <Stack.Screen name="모의시험 문제" component={TestQuestions} />
    <Stack.Screen name="모의시험 결과" component={TestResult} />
    <Stack.Screen
      name="해설"
      component={QuestComment}
      // options={{
      //   headerLeft: () => (
      //     <TouchableOpacity onPress={() => console.log("jintak")} />
      //   ),
      // }}
    />
  </Stack.Navigator>
);
