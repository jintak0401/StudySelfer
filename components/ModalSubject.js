import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Modal } from 'react-native-modal';

const Elevation = styled.View`
    border-top-left-radius: 20px;
     
`;

const ModalSubject = (modalVisible, setModalVisible, goToTest) => {
  return (
    <Modal
      //isVisible Props에 State 값을 물려주어 On/off control
      isVisible={modalVisible}
      //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
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
