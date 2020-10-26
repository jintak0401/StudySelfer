export const solvedData = {
  test: {
    // 2020: {
    //   9: ["1 : 23 : 31", "85점", "2등급"],
    //   8: ["1 : 23 : 31", "85점", "2등급"],
    //   7: ["1 : 23 : 31", "85점", "2등급"],
    //   6: ["1 : 23 : 31", "85점", "2등급"],
    // },
    // 2018: {
    //   11: ["1 : 23 : 31", "85점", "2등급"],
    //   10: ["1 : 23 : 31", "85점", "2등급"],
    //   // 9: ["1 : 23 : 31", "85점", "2등급"],
    //   // 8: ["1 : 23 : 31", "85점", "2등급"],
    //   // 7: ["1 : 23 : 31", "85점", "2등급"],
    //   6: ["1 : 23 : 31", "85점", "2등급"],
    //   5: ["1 : 23 : 31", "85점", "2등급"],
    //   4: ["1 : 23 : 31", "85점", "2등급"],
    //   3: ["1 : 23 : 31", "85점", "2등급"],
    // },
  },
  recommend: {
    201020: ["0:23:31", "4/5 문제"],
    201021: ["0:20:33", "3/5 문제"],
    201022: ["0:18:21", "5/5 문제"],
    201023: ["0:24:41", "2/5 문제"],
    201024: ["0:21:22", "4/5 문제"],
    201025: ["0:19:34", "5/5 문제"],
  },
};

export const getSolvedMonth = (year, month) => {
  return solvedData.test[year]?.[month];
};

export const setSolvedData = (year, month, time, grade, rank) => {
  if (!solvedData.test[year]) solvedData.test[year] = {};
  solvedData.test[year][month] = [time, grade, rank];
};

export const resetSolvedData = () => {
  solvedData.test = {};
};

export const solveTodayRecommend = (dateKey, time, result) => {
  solvedData.recommend = {
    ...solvedData.recommend,
    [dateKey]: [time, `${result}/5 문제`],
  };
};

export const getTodayRecommend = () => {
  const date = new Date();
  const [year, month, day] = [
    date.getFullYear() % 100,
    date.getMonth() + 1,
    date.getDate(),
  ];
  const key = `${year}${month}${day}`;
  return solvedData.recommend[key];
};
