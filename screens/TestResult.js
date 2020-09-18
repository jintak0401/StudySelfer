import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { State } from "react-native-gesture-handler";
import { Table, Row, Rows } from "react-native-table-component";
import QuestResult from "../components/QuestResult";

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

// ...

export default (props) => {
  const [table, setTable] = useState({
    tableHead: ["풀이시간", "점수", "등급"],
    tableData: [["00:28:36", "90점", "2등급"]],
  });

  const selAns = [1, 2, 3, 4, 5, 1, 2];
  const corAns = [1, 2, 3, 4, 1, 2, 2];

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={table.tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <Rows data={table.tableData} textStyle={styles.text} />
      </Table>

      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <QuestResult
          key={n}
          questNum={n}
          selAns={selAns[n - 1]}
          corAns={corAns[n - 1]}
          navigation={props.navigation}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  head: {
    height: 30,
    backgroundColor: "#f1f8ff",
  },
  text: {
    margin: 6,
    textAlign: "center",
  },
  resultBoxSet: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  boxSet: {
    flex: 1,
    marginHorizontal: 50,
    marginTop: 20,
  },
  category: {
    flexDirection: "row",
    backgroundColor: "skyblue",
    alignContent: "center",
    // alignItems: "center",
    flex: 2,
    borderColor: "gray",
  },
  value: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
  },
  box: {
    borderWidth: 2,
    flex: 1,
  },
  resultBox: {
    flexDirection: "row",
    borderWidth: 2,
    flex: 3,
  },
  questions: {
    flex: 3,
  },
  resultText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
