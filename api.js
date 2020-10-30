import axios from "axios";
import { array } from "prop-types";
import { Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

export const apiTestQuests = async () => {
  try {
    const { data } = await axios.get(
      "http://211.43.12.24:9999/api/try_test/19년수능"
    );
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const apiTestSolutions = async () => {
  try {
    const { data } = await axios.get(
      "http://211.43.12.24:9999/api/solutions/19년수능"
    );
    return data;
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const apiTestAns = async () => {
  try {
    const { data } = await axios.get(
      "http://211.43.12.24:9999/api/answers/19년수능"
    );
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const apiPostChapter = async (type, chapter) => {
  const data = { type: type, chapter: chapter };
  try {
    const retval = await axios.post(
      "http://211.43.12.24:9999/api/diagnose/chapters",
      data
    );
    return retval;
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const apiPostAnswer = async (time, ans, removedAns) => {
  const data = { time: time, answer: ans, removedAnswer: removedAns };
  try {
    retval = await axios.post(
      "http://211.43.12.24:9999/api/diagnose/answer_data",
      data
    );
    return retval;
  } catch (e) {
    console.erro(e);
    return {};
  }
};

export const apiPostOneAnswer = async ({
  removedAns,
  time,
  studentAns,
  testType,
  questId,
}) => {
  const data = {
    excluded_option: removedAns,
    time_taken: time,
    choice: studentAns,
    exited: 0,
    test_type: testType,
    question_id: questId,
  };
  try {
    await axios.post("http://211.43.12.24:9999/api/diagnose/answer_data", data);
  } catch (e) {
    console.error(e);
  }
};

export const apiGetRecommend = async () => {
  try {
    const { data } = await axios.get("http://211.43.12.24:9999/recommendation");
    const tmp = { 1: undefined, 2: undefined, 3: undefined };
    const retval = {
      quests: { ...tmp },
      solutions: { ...tmp },
      correctAns: { ...tmp },
      isChoice: { ...tmp },
    };
    data.forEach((x, idx) => {
      retval.quests[idx + 1] = x.question_image_url;
      retval.solutions[idx + 1] = x.solution_image_url;
      retval.correctAns[idx + 1] = x.correct_answer;
      retval.isChoice[idx + 1] = x.type;
    });
    return retval;
  } catch (e) {
    console.error(e);
    return {};
  }
};
