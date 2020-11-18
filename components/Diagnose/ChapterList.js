import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { studentSolveData } from "../../solvedData";
import ListElement from "./ListElement";

const Cotainer = styled.View`
  width: 85%;
  justify-content: center;
  align-items: center;
`;

export default ({ subject }) => {
  const [lists, setLists] = useState(studentSolveData.diagnose[subject]);

  useEffect(() => {
    setLists(studentSolveData.diagnose[subject]);
  }, [subject]);

  return (
    <Cotainer>
      {[
        lists.map((val, idx) => {
          return <ListElement key={idx} name={val[0]} data={val[1]} />;
        }),
      ]}
    </Cotainer>
  );
};
