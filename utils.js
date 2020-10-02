import { Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

export const timerFormat = (secs) => {
  const h_str = "0" + parseInt(secs / 3600).toString();
  const m = parseInt((secs % 3600) / 60).toString();
  const s = parseInt(secs % 60).toString();
  const m_str = (m.length === 1 ? "0" : "") + m;
  const s_str = (s.length === 1 ? "0" : "") + s;
  return h_str + " : " + m_str + " : " + s_str;
};

export const getGrade = (studentAns, correctAns) => {
  const math = { 4: 3, 14: 4, 22: 3, 26: 4 };
  let allotedScore = 2;
  const ret = { totalScore: 0, wrongAns: {} };
  for (let i = 1; i <= 30; i++) {
    allotedScore = i in math ? math[i] : allotedScore;
    if (studentAns[i] === correctAns[i]) ret.totalScore += allotedScore;
    else ret.wrongAns[i] = [studentAns[i], correctAns[i]];
  }
  return ret;
};

export const screenInfo = {
  isTablet: HEIGHT > 1000,
  WIDTH: WIDTH,
  HEIGHT: HEIGHT,
};
