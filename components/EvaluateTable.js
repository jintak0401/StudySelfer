import React, { useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Table, Row, Rows } from "react-native-table-component";
import { screenInfo } from "../utils";

const { isTablet, WIDTH, HEIGHT } = screenInfo;

const Container = styled.View`
  justify-content: center;
  margin-vertical: 5px;
  width: 80%;
`;

const EvaluateTable = ({ grade }) => {
  const [table, setTable] = useState({
    tableHead: ["백분율", "원점수", "등급", "표준점수"],
    tableData: [["7%", "94점", "2등급", "113점"]],
  });
  return (
    <Container>
      <Table
        borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
        style={{
          marginBottom: 10,
          justifyContent: "center",
        }}
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

export default EvaluateTable;

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
