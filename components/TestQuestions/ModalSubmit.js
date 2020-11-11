import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { YesMark, NoMark } from "../../assets/Svg";

const Container = styled.View`
  background-color: white;
  border-radius: 8px;
  width: 75%;
  height: 220px;
  align-items: center;
`;

const Text = styled.Text`
  color: #4f62c0;
  font-size: 30px;
  margin-top: ${(props) => (props.isFirstLine ? 30 : 0)}px;
  font-family: Ssangmoon;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Button = styled.TouchableOpacity`
  margin-horizontal: 20px;
`;

const Restudy = ({ setModalVisible, goToResult }) => {
  return (
    <Container>
      <Text isFirstLine={true}>제출</Text>
      <Text>하시겠습니까?</Text>
      <ButtonContainer>
        <Button onPress={() => setModalVisible(false)}>
          <NoMark width={50} height={50} />
        </Button>
        <Button
          onPress={() => {
            setModalVisible(false);
            goToResult();
          }}
        >
          <YesMark width={50} height={50} />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const ModalSubmit = ({ modalVisible, setModalVisible, goToResult }) => {
  return (
    <Modal
      isVisible={modalVisible}
      useNativeDriver={true}
      onBackButtonPress={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}
      hideModalContentWhileAnimating={true}
      backdropColor="#4F62C0"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Restudy setModalVisible={setModalVisible} goToResult={goToResult} />
    </Modal>
  );
};

ModalSubmit.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  goToResult: PropTypes.func.isRequired,
};

export default ModalSubmit;
