import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import NoTimeLimit from "../assets/Svg/NoTimeLimit.svg";
import TimeLimit from "../assets/Svg/TimeLimit.svg";
import CancelMark from "../assets/Svg/CancelMark.svg";

const Container = styled.View`
  border-radius: 20px;
  width: 75%;
  height: 250px;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isPractice ? "white" : "#BCE0FD")};
  border-top-left-radius: ${(props) => (props.isPractice ? 8 : 0)}px;
  border-top-right-radius: ${(props) => (props.isPractice ? 8 : 0)}px;
  border-bottom-left-radius: ${(props) => (props.isPractice ? 0 : 8)}px;
  border-bottom-right-radius: ${(props) => (props.isPractice ? 0 : 8)}px;
  padding-horizontal: 10px;
`;

const CancelButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -12px;
  top: -12px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  width: 82%;
  justify-content: space-between;
  align-items: center;
`;

const TextWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: #4f62c0;
  font-size: ${(props) => (props.isFirstLine ? 22 : 15)}px;
  font-family: ${(props) => (props.isFirstLine ? "Ssangmoon" : "NanumSquare")};
  font-weight: ${(props) => (props.isFirstLine ? "normal" : "bold")};
  letter-spacing: ${(props) => (props.isFirstLine ? 0 : -1)}px;
`;

const ModeSelect = ({ setModalVisible, goToTest, title }) => {
  return (
    <Container>
      <Button
        isPractice={true}
        activeOpacity={0.8}
        onPress={() => {
          setModalVisible(false);
          goToTest(title);
        }}
      >
        <Wrapper>
          <NoTimeLimit width={40} height={40} />
          <TextWrapper>
            <Text isFirstLine={true}>연습 모드</Text>
            <Text>시간 제한 없이 문제풀기</Text>
          </TextWrapper>
        </Wrapper>
      </Button>
      <Button
        activeOpacity={0.8}
        onPress={() => {
          setModalVisible(false);
          goToTest(title);
        }}
      >
        <Wrapper>
          <TimeLimit width={40} height={40} />
          <TextWrapper>
            <Text isFirstLine={true}>시험 모드</Text>
            <Text>실전처럼 시간 안에 풀기</Text>
          </TextWrapper>
        </Wrapper>
      </Button>
      <CancelButton activeOpacity={0.8} onPress={() => setModalVisible(false)}>
        <CancelMark width={30} height={30} />
      </CancelButton>
    </Container>
  );
};

const ModalModeSelect = ({
  setModalVisible,
  modalVisible,
  goToTest,
  title,
}) => {
  return (
    <Modal
      //isVisible Props에 State 값을 물려주어 On/off control
      isVisible={modalVisible}
      //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
      useNativeDriver={true}
      onBackButtonPress={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}
      hideModalContentWhileAnimating={true}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ModeSelect
        setModalVisible={setModalVisible}
        goToTest={goToTest}
        title={title}
      />
    </Modal>
  );
};

ModalModeSelect.propTypes = {
  setModalVisible: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  goToTest: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ModalModeSelect;
