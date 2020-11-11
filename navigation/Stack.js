import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Evaluation from "../screens/ChoiceChapter";
import EvaluateQuestions from "../screens/EvaluateQuestions";
import EvaluateResult from "../screens/EvaluateResult";
import Test from "../screens/Test";
import Init from "../screens/Init";
import TestQuestions from "../screens/TestQuestions";
import TestResult from "../screens/TestResult";
import QuestComment from "../screens/QuestComment";
import Recommend from "../screens/Recommend";
import EvaluateComment from "../screens/EvaluateComment";
import RecommendQuestions from "../screens/RecommendQuestions";
import RecommendResult from "../screens/RecommendResult";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      headerStyle: {
        backgroundColor: "blue",
      },
      headerTintColor: "#4F62C0",
      headerBackTitleVisible: false,
    }}
  >
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
