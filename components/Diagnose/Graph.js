import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { DetailAnal } from "../../assets/Svg";
import colorset from "../../colorset";

const Container = styled.View`
  height: 370px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const GraphScroll = styled.ScrollView`
  width: 350px;
  height: 50px;
  margin-top: 20px;
`;

const GraphImage = styled.Image`
  width: 90px;
  aspect-ratio: 0.4966;
`;

export default Grahp = () => {
  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <DetailAnal
          style={{ marginLeft: -130, marginBottom: 20 }}
          width={70}
          height={40}
        />
        <Text
          style={{
            fontFamily: "HGG80",
            color: colorset.lightBlue,
            fontSize: 30,
            marginLeft: 14,
          }}
        >
          상세 분석
        </Text>
      </View>
      <Text
        style={{
          marginTop: 7,
          marginLeft: 10,
          alignSelf: "flex-start",
          fontFamily: "HGG80",
          fontSize: 22,
        }}
      >
        한진탁{" "}
        <Text
          style={{
            fontFamily: "HGG40",
          }}
        >
          학생의 실력변화 그래프
        </Text>
      </Text>
      <Text
        style={{
          alignSelf: "flex-start",
          marginLeft: 10,
          fontFamily: "HGG80",
          color: colorset.cherry,
          fontSize: 30,
          marginBottom: 15,
        }}
      >
        현재 상위 19.7%
      </Text>
      <GraphScroll horizontal={true} showsHorizontalScrollIndicator={false}>
        <GraphImage source={require("../../assets/Png/Graph1.png")} />
        <GraphImage source={require("../../assets/Png/Graph2.png")} />
        <GraphImage source={require("../../assets/Png/Graph3.png")} />
        <GraphImage source={require("../../assets/Png/Graph4.png")} />
        <GraphImage source={require("../../assets/Png/Graph5.png")} />
        <GraphImage source={require("../../assets/Png/Graph6.png")} />
        <GraphImage source={require("../../assets/Png/Graph7.png")} />
        <GraphImage source={require("../../assets/Png/Graph8.png")} />
      </GraphScroll>
    </Container>
  );
};
