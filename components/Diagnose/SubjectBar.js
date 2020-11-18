import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NextBlack, BeforeBlack } from "../../assets/Svg";

const BarImage = styled.ImageBackground`
  width: 85%;
  aspect-ratio: 8.3304;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 7px;
`;

const SubjectText = styled.Text`
  font-family: HGG80;
  font-size: 20px;
`;

export default ({ subject, settingSubject }) => {
  const [title, setTitle] = useState(subject);

  useEffect(() => {
    switch (subject) {
      case "math1":
        setTitle("수학 I");
        break;
      case "math2":
        setTitle("수학 II");
        break;
      case "calculus":
        setTitle("미적분");
        break;
      case "statistic":
        setTitle("확률과 통계");
        break;
    }
  }, [subject]);

  return (
    <BarImage source={require("../../assets/Png/SubjectBar.png")}>
      <BeforeBlack
        width={20}
        height={20}
        style={{
          opacity: subject !== "math1" ? 1 : 0.4,
          position: "absolute",
          left: 15,
          bottom: 13,
        }}
        onPress={() => subject !== "math1" && settingSubject(-1)}
      />
      <SubjectText>{title}</SubjectText>
      <NextBlack
        width={20}
        height={20}
        style={{
          opacity: subject !== "statistic" ? 1 : 0.4,
          position: "absolute",
          right: 15,
          bottom: 13,
        }}
        onPress={() => subject !== "statistic" && settingSubject(1)}
      />
    </BarImage>
  );
};
