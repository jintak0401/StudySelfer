import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components/native";
import { BackMarkWhite } from "../assets/Svg";
import colorset from "../colorset";
import SettingGrade from "../components/SetInfo/SettingGrade";
import SettingType from "../components/SetInfo/SettingType";

const Container = styled.View`
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.View`
  margin-left: -20px;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  font-size: 23px;
  color: white;
  margin-top: 20px;
  font-family: HGG80;
`;

const HeaderImage = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 3.987;
  position: absolute;
  top: 0;
`;

const GoDiagnoseButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const ButtonImage = styled.Image`
  height: 70px;
  aspect-ratio: 4.0032;
  opacity: ${(props) => (props.opacity ? 1 : 0.4)};
`;

export default ({ navigation, route }) => {
  const [grade, setGrade] = useState(undefined);
  const [type, setType] = useState(undefined);

  const settingGrade = (num) => {
    setGrade(grade !== num ? num : undefined);
  };

  const settingType = (t) => {
    setType(type !== t ? t : undefined);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "white", height: 80, elevation: 0 },
      headerTransparent: true,
      headerLeft: () => (
        <BackMarkWhite
          width={20}
          height={20}
          style={{ marginLeft: 20, marginTop: 20 }}
          onPress={() => navigation.pop(1)}
        />
      ),
      headerTitle: () => (
        <TitleContainer>
          <HeaderTitle>상세정보</HeaderTitle>
        </TitleContainer>
      ),
    });
  }, [route]);
  return (
    <Container>
      <SettingGrade grade={grade} setGrade={settingGrade} />
      <SettingType type={type} setType={settingType} />
      <GoDiagnoseButton
        disabled={!(type && grade)}
        onPress={() => navigation.navigate("새 진단평가")}
      >
        <ButtonImage
          opacity={grade && type}
          source={require("../assets/Png/GoToDiagnose.png")}
        />
      </GoDiagnoseButton>
      <HeaderImage
        source={require("../assets/Png/HeaderBackRect.png")}
      ></HeaderImage>
    </Container>
  );
};
