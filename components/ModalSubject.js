import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Modal } from "react-native-modal";

const Elevation = styled.View`
  border-top-left-radius: 20px;
`;

const ModalSubject = (modalVisible, setModalVisible) => {
  return (
    <Modal
      isVisible={modalVisible}
      useNativeDriver={true}
      onBackButtonPress={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}
      hideModalContentWhileAnimating={true}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    ></Modal>
  );
};

ModalSubject.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTYpes.func.isRequired,
  goToTest: PropTypes.func.isRequired,
};
