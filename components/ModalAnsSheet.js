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
      isVisible={answersheetModalVisible}
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
