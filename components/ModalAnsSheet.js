import React from "react";
import AnswerSheet from "./AnswerSheet";
import PropTypes from "prop-types";
import Modal from "react-native-modal";

const ModalAnsSheet = ({
  inTest,
  answersheetModalVisible,
  setAnswersheetModalVisible,
  studentAns,
  correctAns,
  bookmarks,
  time,
  changeQuestNum,
  setSubmitModalVisible,
}) => {
  return (
    <Modal
      //isVisible Props에 State 값을 물려주어 On/off control
      isVisible={answersheetModalVisible}
      //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
      useNativeDriver={true}
      onBackButtonPress={() => setAnswersheetModalVisible(false)}
      onBackdropPress={() => setAnswersheetModalVisible(false)}
      hideModalContentWhileAnimating={true}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <AnswerSheet
        inTest={inTest}
        studentAns={studentAns}
        correctAns={correctAns}
        bookmarks={bookmarks}
        time={time}
        setAnswersheetModalVisible={setAnswersheetModalVisible}
        changeQuestNum={changeQuestNum}
        setSubmitModalVisible={setSubmitModalVisible}
      />
    </Modal>
  );
};

ModalAnsSheet.propTypes = {
  inTest: PropTypes.bool.isRequired,
  answersheetModalVisible: PropTypes.bool.isRequired,
  setAnswersheetModalVisible: PropTypes.func.isRequired,
  studentAns: PropTypes.object.isRequired,
  correctAns: PropTypes.object,
  bookmarks: PropTypes.object.isRequired,
  time: PropTypes.number.isRequired,
  changeQuestNum: PropTypes.func.isRequired,
  setSubmitModalVisible: PropTypes.func,
};

export default ModalAnsSheet;
