import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import styled from "styled-components/native";
import { screenInfo } from "../../utils";

const { isTablet, WIDTH } = screenInfo;

const Container = styled.View`
  margin-vertical: 5px;
  width: 80%;
  margin-left: ${0.1 * WIDTH}px;
`;

const ResultTable = ({ time, grade }) => {
  const [table, setTable] = useState({
    tableHead: ["풀이시간", "점수", "등급"],
    tableData: [[time, grade, "2등급"]],
  });
  return (
    <Container>
      <Table
        borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
        style={{ marginBottom: 10, justifyContent: "center" }}
      >
        <Row
          data={table.tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <Rows
          style={{ height: isTablet ? 50 : 30 }}
          data={table.tableData}
          textStyle={styles.text}
        />
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
    height: isTablet ? 50 : 30,
    backgroundColor: "#f1f8ff",
  },
  text: {
    margin: 6,
    fontSize: isTablet ? 20 : 14,
    textAlign: "center",
  },
});
