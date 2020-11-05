const sub2num = { math1: 1, math2: 2, statistic: 3, calculus: 4, vector: 5 };
const chap2id = {
  math1_1: 3,
  math1_2: 4,
  math1_3: 5,
  math2_1: 6,
  math2_2: 7,
  math2_3: 8,
  math2_4: 9,
  statistic_1: 10,
  statistic_2: 11,
  statistic_3: 12,
  statistic_4: 13,
  calculus_1: 14,
  calculus_2: 15,
  calculus_3: 16,
  vector_1: 17,
  vector_2: 18,
  vector_3: 19,
  vector_4: 20,
};

const chapters = {
  math1: [
    { id: "math1_1", value: "지수와 로그" },
    { id: "math1_2", value: "삼각함수" },
    { id: "math1_3", value: "수열" },
  ],
  math2: [
    { id: "math2_1", value: "함수의 극한" },
    { id: "math2_2", value: "함수의 극한과 연속성" },
    { id: "math2_3", value: "다항함수의 미분" },
    { id: "math2_4", value: "다항함수의 적분" },
  ],
  statistic: [
    { id: "statistic_1", value: "경우의 수" },
    { id: "statistic_2", value: "순열과 조합" },
    { id: "statistic_3", value: "확률" },
    { id: "statistic_4", value: "통계" },
  ],
  calculus: [
    { id: "calculus_1", value: "수열의 극한" },
    { id: "calculus_2", value: "미분법" },
    { id: "calculus_3", value: "적분법" },
  ],
  vector: [
    { id: "vector_1", value: "평면곡선" },
    { id: "vector_2", value: "벡터" },
    { id: "vector_3", value: "공간도형" },
    { id: "vector_4", value: "공간좌표" },
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

export { sub2num, chapters, area, chap2id };
