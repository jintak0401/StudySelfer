import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { StudyingPerson, CancelMark, YesMark } from "../../assets/Svg";

const Container = styled.View`
  background-color: white;
  border-radius: 8px;
  width: 75%;
  height: 380px;
  align-items: center;
`;

const Text = styled.Text`
  color: ${(props) => (props.isWarning ? "#C04F4F" : "#4F62C0")};
  font-size: ${(props) =>
    props.isWarning ? 16 : props.isFirstLine ? 48 : 23}px;
  margin-top: ${(props) =>
    props.isWarning ? 16 : props.isFirstLine ? 30 : 0}px;
  font-family: ${(props) => (props.isWarning ? "NanumSquare" : "Ssangmoon")};
  font-weight: ${(props) => (props.isWarning ? "bold" : "normal")};
`;

const YesButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

const CancelButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -12px;
  top: -12px;
`;

const Restudy = ({
  setRestudyModalVisible,
  setModeModalVisible,
  setSelectedMonth,
}) => {
  return (
    <Container>
      <StudyingPerson
        width={200}
        height={200}
        style={{
          position: "absolute",
          right: 0,
          bottom: 20,
        }}
      />
      <CancelButton
        activeOpacity={0.8}
        onPress={() => {
          setSelectedMonth(0);
          setRestudyModalVisible(false);
        }}
      >
        <CancelMark width={30} height={30} />
      </CancelButton>
      <Text isFirstLine={true}>재 학습</Text>
      <Text>하시겠습니까?</Text>
      <Text isWarning={true}>※ 기존 기록이 지워져요!</Text>
      <YesButton
        onPress={() => {
          setRestudyModalVisible(false);
          setModeModalVisible(true);
        }}
      >
        <YesMark width={50} height={50} />
      </YesButton>
    </Container>
  );
};

const ModalRestudy = ({
  restudyModalVisible,
  setRestudyModalVisible,
  setModeModalVisible,
  setSelectedMonth,
}) => {
  return (
    <Modal
      isVisible={restudyModalVisible}
      useNativeDriver={true}
      onBackButtonPress={() => {
        setSelectedMonth(0);
        setRestudyModalVisible(false);
      }}
      onBackdropPress={() => {
        setSelectedMonth(0);
        setRestudyModalVisible(false);
      }}
      hideModalContentWhileAnimating={true}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Restudy
        setRestudyModalVisible={setRestudyModalVisible}
        setModeModalVisible={setModeModalVisible}
        setSelectedMonth={setSelectedMonth}
      />
    </Modal>
  );
};

ModalRestudy.propTypes = {
  restudyModalVisible: PropTypes.bool.isRequired,
  setRestudyModalVisible: PropTypes.func.isRequired,
  setModeModalVisible: PropTypes.func.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
};

export default ModalRestudy;
