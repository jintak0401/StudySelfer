import React from "react";
import {
  HeaderBackButton,
  createStackNavigator,
} from "@react-navigation/stack";
import Evaluation from "../screens/ChoiceChapter";
import EvaluateQuestions from "../screens/EvaluateQuestions";
import EvaluateResult from "../screens/EvaluateResult";
import Test from "../screens/Test";
import Init from "../screens/Init";
import TestQuestions from "../screens/TestQuestions";
import TestResult from "../screens/TestResult";
import QuestComment from "../screens/QuestComment";
import { Button, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StepUp from "../assets/Svg/StepUp.svg";
import Book from "../assets/Svg/Book.svg";
import SubjectSelect from "../screens/SubjectSelect";
import Recommend from "../screens/Recommend";
import EvaluateComment from "../screens/EvaluateComment";
import RecommendQuestions from "../screens/RecommendQuestions";
import RecommendResult from "../screens/RecommendResult";

const Stack = createStackNavigator();

export default ({ navigation }) => (
  <Stack.Navigator
    mode="modal"
    // headerMode="float"
    screenOptions={{
      // animationEnabled: false,
      // headerMode: "none",
      headerStyle: {
        backgroundColor: "blue",
        // height: 100,
      },
      headerTintColor: "#4F62C0",
      headerBackTitleVisible: false,
    }}
  >
    {/* <Stack.Screen name="과목선택" component={SubjectSelect} /> */}
    <Stack.Screen name="초기화면" component={Init} />
    <Stack.Screen
      name="추천"
      component={Recommend}
      headerStyle={{ backgroundColor: "tomato" }}
    />
    <Stack.Screen name="진단평가" component={Evaluation} />
    <Stack.Screen name="진단평가문제" component={EvaluateQuestions} />
    <Stack.Screen name="진단평가결과" component={EvaluateResult} />
    <Stack.Screen name="모의수능 및 모의고사" component={Test} />
    <Stack.Screen name="모의시험 문제" component={TestQuestions} />
    <Stack.Screen name="모의시험 결과" component={TestResult} />
    <Stack.Screen name="해설" component={QuestComment} />
    <Stack.Screen name="진단해설" component={EvaluateComment} />
    <Stack.Screen name="추천문제" component={RecommendQuestions} />
    <Stack.Screen name="추천문제결과" component={RecommendResult} />
  </Stack.Navigator>
);

// <Stack.Screen
//   options={{
//     height: 100,
//     headerLeft: () => (
//       <TouchableOpacity>
//         <Book marginLeft={30} width={50} height={50} />
//       </TouchableOpacity>
//     ),
//     headerStyle: { backgroundColor: "#4F62C0", height: 150 },
//     headerTitle: () => (
//       <>
//         <Text style={{ marginTop: 30, color: "black", fontSize: 30 }}>
//           jintak
//         </Text>
//         <Text>wlskr</Text>
//       </>
//     ),
//   }}
//   name="초기화면"
//   component={Init}
// />
