import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { getGrade, timerFormat } from "./../utils";
import styled from "styled-components/native";

const Container = styled.View`
  margin-vertical: 5px;
`;

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
    <Container>
      <Table
        borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
        style={{ marginBottom: 10 }}
      >
        <Row
          data={table.tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <Rows data={table.tableData} textStyle={styles.text} />
      </Table>
    </Container>
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
