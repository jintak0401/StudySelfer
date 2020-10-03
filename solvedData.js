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
