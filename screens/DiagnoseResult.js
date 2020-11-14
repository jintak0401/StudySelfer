import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import { ResultSummary } from "../components/Diagnose";
import { DrawerMenu } from "../assets/Svg";

const TopImage = styled.Image`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
`;

const Container = styled.ScrollView`
  width: 100%;
  margin-top: 150px;
  background-color: white;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

const HeaderTitle = styled.Image`
  resize-mode: center;
`;

const DiagnoseResult = (props) => {
  const { navigation, route } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerTransparent: true,
      headerStyle: { backgroundColor: "#4F62C0", height: 100 },
      headerTitle: () => (
        <HeaderTitle source={require("../assets/Png/HeaderTitle.png")} />
      ),
      headerRight: () => (
        <DrawerMenu
          width={30}
          height={30}
          style={{ marginRight: 20 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
    });
  }, [route]);

  return (
    <>
      <TopImage source={require("../assets/Png/StartPage.png")} />
      <Container>
        <ResultSummary />
      </Container>
    </>
  );
};

export default DiagnoseResult;
