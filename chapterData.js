const sub2num = { math1: 1, math2: 2, statistic: 3, calculus: 4, vector: 5 };

const chapters = {
  math1: [
    { id: "math1_1", value: "지수함수와 로그함수" },
    { id: "math1_2", value: "삼각함수" },
    { id: "math1_3", value: "수열" },
  ],
  math2: [
    { id: "math2_1", value: "수열의 극한" },
    { id: "math2_2", value: "미분" },
    { id: "math2_3", value: "적분" },
  ],
  calculus: [
    { id: "calculus_1", value: "수열의 극한" },
    { id: "calculus_2", value: "미분법" },
    { id: "calculus_3", value: "적분법" },
  ],
  statistic: [
    { id: "statistic_1", value: "경우의 수" },
    { id: "statistic_2", value: "확률" },
    { id: "statistic_3", value: "통계" },
  ],
  vector: [
    { id: "vector_1", value: "이차곡선" },
    { id: "vector_2", value: "평면벡터" },
    { id: "vector_3", value: "공간도형과 공간좌표" },
  ],
};

const area = {
  liberal: [
    ["math1", "수학 I"],
    ["math2", "수학 II"],
    ["statistic", "확률과 통계"],
  ],
  natural: [
    ["math1", "수학 I"],
    ["calculus", "미적분"],
    ["statistic", "확률과 통계"],
    ["vector", "기하와 벡터"],
  ],
};

export { sub2num, chapters, area };
