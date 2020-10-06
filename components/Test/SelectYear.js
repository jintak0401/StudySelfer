// import React from "react";
// import styled from "styled-components/native";
// import PropTypes from "prop-types";
// import Dash from "react-native-dash";

// const Container = styled.View`
//   width: 80%;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 47px;
// `;

// const TitleContainer = styled.View`
//   flex-direction: row;
//   width: 100%;
//   justify-content: flex-start;
//   align-items: center;
//   margin-top: ${(props) => (props.needMarginTop ? 50 : 0)}px;
// `;

// const Button = styled.TouchableOpacity``;

// const Text = styled.Text`
//   font-size: 17px;
//   color: #999999;
// `;

// const SelectYear = ({ year, setSelectedYear, needMarginTop }) => {
//   return (
//     <Container>
//       <TitleContainer needMarginTop={needMarginTop}>
//         <Button onPress={() => setSelectedYear(year)}>
//           <Text>{year}년 모의고사</Text>
//         </Button>
//       </TitleContainer>
//       <Dash
//         style={{ position: "relative", top: 0, width: "100%", height: 1 }}
//         dashGap={3}
//         dashLength={5}
//         dashThickness={1}
//         dashColor="#999999"
//       />
//     </Container>
//   );
// };

// selectyear.proptypes = {
//   year: proptypes.number.isrequired,
//   setselectedyear: proptypes.func.isrequired,
//   needmargintop: proptypes.bool.isrequired,
// };

// export default selectyear;

import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Collapsible from "react-native-collapsible";
import { getSolvedMonth, solvedData } from "../../solvedData";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Dash from "react-native-dash";
import { getTestTitle } from "../../utils";

const Container = styled.View`
  width: 85%;
  justify-content: center;
  margin-bottom: 2px;
  margin-bottom: 25px;
`;

const ContainerButton = styled.TouchableOpacity`
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 5px;
`;

const TestTitleButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const TestTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ContainerText = styled.Text`
  color: ${(props) => (props.selected ? "#4F62C0" : "#999999")};
  font-size: 17px;
`;

const SelectYear = ({ year, setSelectedYear }) => {
  const [selected, setSelected] = useState(false);
  const title = `${year}년 모의고사`;

  return (
    <Container>
      <TestTitleContainer>
        <TestTitleButton
          onPress={() => {
            setSelectedYear(year);
          }}
        >
          <ContainerText selected={selected}>{title}</ContainerText>
        </TestTitleButton>
      </TestTitleContainer>
      <Dash
        style={{ position: "absolute", top: 22.7, width: "100%", height: 1 }}
        dashGap={3}
        dashLength={5}
        dashThickness={1}
        dashColor={selected ? "#4f62c0" : "#999999"}
      />
    </Container>
  );
};

SelectYear.propTypes = {
  year: PropTypes.number.isRequired,
  setSelectedYear: PropTypes.func.isRequired,
};

export default SelectYear;
