import axios from "axios";
import { Dimensions } from "react-native";
import { testInfo } from "./testInfo";

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
    console.error(e);
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
  const tmp = { 1: undefined, 2: undefined, 3: undefined };
  const retval = {
    quests: { ...tmp },
    solutions: { ...tmp },
    correctAns: { ...tmp },
    isChoice: { ...tmp },
  };
  try {
    const { data } = await axios.get("http://211.43.12.24:9999/recommendation");
    data.forEach((x, idx) => {
      retval.quests[idx + 1] = x.question_image_url;
      retval.solutions[idx + 1] = x.solution_image_url;
      retval.correctAns[idx + 1] = x.correct_answer;
      retval.isChoice[idx + 1] = x.type;
    });
  } catch (e) {
    console.error(e);
  }
  return retval;
};

export const apiGetRecommendNode = async () => {
  const tmp = { 1: undefined, 2: undefined, 3: undefined };
  const retval = {
    id: { ...tmp },
    quests: { ...tmp },
    solutions: { ...tmp },
    correctAns: { ...tmp },
    isChoice: { ...tmp },
    chapter: { ...tmp },
  };
  try {
    const { data } = await axios.get("http://3.35.52.211:9696/recommendation");
    data.forEach((x, idx) => {
      retval.id[idx + 1] = x.id;
      retval.quests[idx + 1] = x.question_image;
      retval.solutions[idx + 1] = x.solution_image;
      retval.correctAns[idx + 1] = x.correct_answer;
      retval.isChoice[idx + 1] = x.answer_type;
      retval.chapter[idx + 1] = x.part_chapter;
    });
  } catch (e) {
    console.error(e);
  }
  return retval;
};

const convertRemovedAns = (removedAns) => {
  if (!removedAns) return "00000";
  let retval = "";
  [1, 2, 3, 4, 5].forEach((choiceNum) => {
    retval += removedAns[choiceNum] ? "1" : "0";
  });
  return retval;
};

export const apiPostRecommend = async (removedAns, time, studentAns, id) => {
  const data = [];
  [1, 2, 3].forEach((qNum, idx) => {
    data[idx] = {
      excluded_option: convertRemovedAns(removedAns[qNum]),
      time_taken: time[qNum],
      choice: studentAns[qNum],
      exited: false,
      question_id: id[qNum],
    };
  });
  try {
    const postRetval = await axios.post(
      "http://3.35.52.211:9696/recommendation",
      data
    );
    return postRetval;
  } catch (e) {
    console.error(e);
  }
};

export const apiGetTestList = async () => {
  const testInfo = { mockTest: {}, sat: [] };
  const getYear = (obj) => {
    return 2000 + parseInt(obj.title.slice(0, 2));
  };
  const getMonth = (obj) => {
    if (obj.title[7] === "월") {
      return parseInt(obj.title[6]);
    }
    return parseInt(obj.title.slice(6, 8));
  };
  try {
    const { data } = await axios.get("http://3.35.52.211:9696/test");
    data.forEach((obj) => {
      const year = getYear(obj);
      if (obj.title.slice(-1) === "능") {
        testInfo.push(year);
      } else {
        const month = getMonth(obj);
        if (!testInfo[year]) {
          testInfo.mockTest[year] = [];
        }
        testInfo.mockTest[year].push(month);
      }
    });
    for (const key in testInfo.mockTest) {
      testInfo.mockTest[key].sort((a, b) => a - b);
    }
    testInfo.sat.sort((a, b) => a - b);
  } catch (e) {
    console.error(e);
  }
  return testInfo;
};

export const apiGetRecommendDayList = async () => {
  const { data } = await axios.get("http://3.35.52.211:9696/try");
  const getDateKey = (date) => {
    const monthKey = date.slice(2, 4) + date.slice(5, 7);
    const dayKey = date.slice(8, 10);
    return [monthKey, dayKey];
  };
};

export const apiGetTest = async (title) => {
  const searchTitle =
    title.slice(-1) === "능" ? title.slice(2) : title.slice(2, -4);
  const getTestId = async () => {
    const { data } = await axios.get("http://3.35.52.211:9696/test");
    data.forEach((obj) => {
      if (obj.title === searchTitle) return obj.id;
    });
  };
  const getTestData = async (id) => {
    // const { data } = await axios.get(`http://3.35.52.211:9696/test/${id}`);
    const { data } = await axios.get(`http://3.35.52.211:9696/test/21`);
    return data;
  };
  const id = getTestId();
  const data = await getTestData(id);
  const tmp = [...Array(30)]
    .map((x, i) => i + 1)
    .reduce((tmp, x) => {
      return { ...tmp, [x]: undefined };
    }, {});
  const retval = {
    id: { ...tmp },
    isChoice: { ...tmp },
    questionImageUrl: { ...tmp },
    solutionImageUrl: { ...tmp },
    correctAns: { ...tmp },
  };
  data.forEach((obj, idx) => {
    retval.id[idx + 1] = obj.id;
    retval.isChoice[idx + 1] = obj.answer_type;
    retval.questionImageUrl[idx + 1] = obj.question_image;
    retval.solutionImageUrl[idx + 1] = obj.solution_image;
    retval.correctAns[idx + 1] = obj.correct_answer;
  });
  return retval;
};

export const apiPostEvaluationInit = async (type, chapter) => {
  const postData = { parts: chapter, type: type };
  const { data } = await axios.post(
    "http://3.35.52.211:9696/evaluation",
    postData
  );
  const retval = {
    id: data.id,
    isChoice: data.answer_type,
    questionImageUrl: data.question_image,
    solutionImageUrl: data.solution_image,
    correctAns: data.correct_answer,
  };
  return retval;
};

export const apiPostEvaluation = async (removedAns, time, studentAns, id) => {
  // POST를 하는 데이터의 형식
  const postData = {
    try: {
      excluded_option: convertRemovedAns(removedAns),
      time_taken: time,
      choice: studentAns,
      exited: false,
      question_id: id,
    },
  };
  // 데이터 요청
  try {
    const { data } = await axios.post(
      "http://3.35.52.211:9696/evaluation",
      postData
    );
    const retval = {};
    // 진단평가가 끝난 경우
    if (data.expected_grade) {
      retval.grade = data.expected_grade;
      retval.rawScore = data.raw_score;
      retval.standardScore = data.standard_score;
      retval.good = data.good;
      retval.bad = data.bad;
    }
    // 아직 진단문제가 있는 경우
    else {
      retval.id = data.id;
      retval.isChoice = data.answer_type;
      retval.questionImageUrl = data.question_image;
      retval.solutionImageUrl = data.solution_image;
      retval.correctAns = data.correct_answer;
    }
    return retval;
  } catch (e) {
    console.error(e);
    return {};
  }
};
