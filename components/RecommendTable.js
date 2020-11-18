import React, { useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Table, Row, Rows } from "react-native-table-component";
import { screenInfo } from "../utils";
import colorset from "../colorset";

const { isTablet } = screenInfo;

const Container = styled.View`
  justify-content: center;
  margin-vertical: 5px;
  width: 90%;
`;

// aspect-ratio: 2.2653;
const TableBackground = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 2.2653;
  resize-mode: stretch;
`;

const TableTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex: 45;
`;

const TableContentContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex: 120;
`;

const TableTitle = styled.Text`
  font-family: HGG60;
  color: white;
  font-size: 18px;
`;

const TableContent = styled.Text`
  font-family: HGG80;
  color: ${colorset.lightBlue};
  font-size: ${(props) => (props.isTime ? 20 : 25)}px;
  padding-bottom: 20px;
`;

const Divider = styled.View`
  position: absolute;
  width: 2px;
  height: 80px;
  background-color: ${colorset.lightGray};
  left: 50%;
  top: 35%;
`;

const RecommendTable = ({ time, result }) => {
  const [table] = useState({
    tableHead: ["시간", "결과"],
    tableData: [[time, result]],
  });
  return (
    <Container>
      <TableBackground source={require("../assets/Png/TableBackground.png")}>
        <TableTitleContainer>
          <TableTitle style={{ marginLeft: -10 }}>풀이시간</TableTitle>
          <TableTitle>결과</TableTitle>
        </TableTitleContainer>
        <TableContentContainer>
          <TableContent isTime={true}>{time}</TableContent>
          <TableContent>{result}</TableContent>
        </TableContentContainer>
        <Divider />
        {/* <Table
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
        </Table> */}
      </TableBackground>
    </Container>
  );
};

export default RecommendTable;

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
