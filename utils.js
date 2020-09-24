export const timerFormat = (secs) => {
  const h_str = "0" + parseInt(secs / 3600).toString();
  const m = parseInt((secs % 3600) / 60).toString();
  const s = parseInt(secs % 60).toString();
  const m_str = (m.length === 1 ? "0" : "") + m;
  const s_str = (s.length === 1 ? "0" : "") + s;
  return h_str + " : " + m_str + " : " + s_str;
};

export const getGrade = (studentAns, correctAns) => {
  console.log(studentAns);
  const math = { 4: 3, 14: 4, 22: 3, 26: 4 };
  let allotedScore = 2;
  const ret = { totalScore: 0, wrongAns: {} };
  for (let i = 0; i < 30; i++) {
    allotedScore = i + 1 in math ? math[i + 1] : allotedScore;
    if (studentAns[i] === correctAns[i]) ret.totalScore += allotedScore;
    else ret.wrongAns[i + 1] = [studentAns[i], correctAns[i]];
  }
  return ret;
};
