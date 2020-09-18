import React, { useState, useLayoutEffect, useEffect } from "react";
import Questions from "../components/Questions";
import { TouchableOpacity, Button, View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { apiTestQuests } from "./../api";
import * as Progress from "react-native-progress";
import moment from "moment";
import { timerFormat } from "../utils";

const falseArr = () => {
  const ret = [];
  for (let i = 0; i < 30; i++) {
    ret.push(false);
  }
  return ret;
};

const initAns = () => {
  const ret = [];
  for (let i = 1; i <= 30; i++) {
    ret.push(0);
  }
  return ret;
};

const incNum = (n) => {
  if (n + 1 >= 5) return n;
  return n + 1;
};

const decNum = (n) => {
  if (n == 0) return 0;
  return n - 1;
};

export default ({ navigation }) => {
  const [questNum, setQuestNum] = useState(30);
  const [answers, setAnswers] = useState(initAns());
  const [bookmarks, setBookmarks] = useState(falseArr());
  const [data, setData] = useState({});
  // const [time, setTime] = useState(
  //   moment.duration(0).add({ hours: 1, minutes: 40, seconds: 5 })
  // );
  const [time, setTime] = useState(6005);
  const [timeTick, setTimeTick] = useState(null);

  // const startTimer = () => {
  //   const tick = () =>
  //     setTime((prevTime) => prevTime.clone().subtract(1, "seconds"));
  //   const timeTick = setInterval(() => {
  //     tick();
  //   }, 1000);
  //   setTimeTick(timeTick);
  // };

  // const startTimer = () => {
  //   const x = setInterval(() => {
  //     if (time <= 0) {
  //       clearInterval(x);
  //     } else {
  //       setTime((prevTime) => prevTime.clone().subtract(1, "seconds"));
  //     }
  //   }, 1000);
  // };

  // const startTimer = () => {
  //   console.log("before", time);
  //   setTime(cnt);
  //   cnt -= 1;
  //   console.log("after", time);
  //   console.log("cnt :", cnt);
  // };

  const getData = async () => {
    const tmp = await apiTestQuests();
    setData({ ...tmp });
  };

  useEffect(() => {
    getData();
    // startTimer();
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const bookmarking = (n) =>
    setBookmarks([
      ...bookmarks.slice(0, n - 1),
      !bookmars[n - 1],
      ...bookmarks.slice(n),
    ]);

  const selectAns = (q, n) => {
    const tmp = [...answers];
    tmp[q - 1] = answers[q - 1] === n ? 0 : n;
    setAnswers([...tmp]);
  };

  const changeQuestNum = (num) => {
    if (1 <= num && num <= 30) {
      setQuestNum(num);
    }
  };

  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={1 - time / 6005}
        color={"skyblue"}
        width={400}
        height={14}
        borderRadius={10}
      >
        <Text
          style={{
            alignSelf: "center",
            color: "gray",
            position: "absolute",
            // top: 0.5,
            fontSize: 12,
          }}
        >
          {/* {timerFormat(time.asSeconds())} */}
          {timerFormat(time)}
        </Text>
        {/* {console.log(timerFormat(time.asSeconds()))} */}
        {/* {console.log(timerFormat(time))} */}
      </Progress.Bar>
      <TouchableOpacity style={styles.iconSet}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="clock-outline"
          size={30}
          color="gray"
        />
        <MaterialCommunityIcons
          style={styles.icon}
          name="bookmark-outline"
          size={30}
          color="gray"
        />
        <MaterialCommunityIcons
          style={styles.icon}
          name="subtitles-outline"
          size={30}
          color="gray"
        />
      </TouchableOpacity>
      <Questions key={questNum} questNum={questNum} data={data[questNum]} />
      <View style={styles.ansBtnSet}>
        {[1, 2, 3, 4, 5].map((n) => (
          <View key={`${questNum}${n}`} style={{ flex: 1 }}>
            <Button
              color={answers[questNum - 1] === n ? "blue" : "gray"}
              title={`${n}`}
              onPress={() => selectAns(questNum, n)}
            />
          </View>
        ))}
      </View>
      <View style={styles.questBtnSet}>
        <View style={styles.questBtn}>
          {questNum === 1 ? (
            <></>
          ) : (
            <Button title="Prev" onPress={() => changeQuestNum(questNum - 1)} />
          )}
        </View>
        <View style={styles.questBtn}>
          <Button
            title={questNum === 30 ? "Done" : "Next"}
            onPress={() =>
              questNum === 30
                ? navigation.navigate("모의시험 결과")
                : changeQuestNum(questNum + 1)
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  iconSet: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 20,
    marginTop: 10,
  },
  icon: {
    padding: 5,
  },
  ansBtnSet: {
    flex: 1,
    flexDirection: "row",
    margin: 0,
    // backgroundColor: "red",
  },
  questBtnSet: {
    flex: 1,
    flexDirection: "row",
    margin: 0,
    // backgroundColor: "yellow",
  },
  questBtn: {
    flex: 1,
  },
});
