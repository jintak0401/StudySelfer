import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { getGrade, timerFormat } from "./../utils";

const correctAns = [
  1,
  2,
  3,
  4,
  5,
  1,
  2,
  3,
  4,
  5,
  1,
  2,
  3,
  4,
  5,
  1,
  2,
  3,
  4,
  5,
  1,
  2,
  3,
  4,
  5,
  1,
  2,
  3,
  4,
  5,
];

const ResultTable = ({ time, studentAns, correctAns }) => {
  const [table, setTable] = useState({
    tableHead: ["풀이시간", "점수", "등급"],
    tableData: [
      [
        timerFormat(time),
        `${getGrade(studentAns, correctAns).totalScore}점`,
        "2등급",
      ],
    ],
  });

  return (
    <View style={styles.container}>
      <Table
        borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
        style={{ marginBottm: 10 }}
      >
        <Row
          data={table.tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <Rows data={table.tableData} textStyle={styles.text} />
      </Table>
    </View>
  );
};

export default ResultTable;

const styles = new StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  head: {
    height: 30,
    backgroundColor: "#f1f8ff",
  },
  text: {
    margin: 6,
    textAlign: "center",
  },
});
