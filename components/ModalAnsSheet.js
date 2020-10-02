import React from "react";
import AnswerSheet from "./AnswerSheet";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { Button, View } from "react-native";

const ModalAnsSheet = ({
  inTest,
  modalVisible,
  setModalVisible,
  studentAns,
  correctAns,
  bookmarks,
  time,
  changeQuestNum,
  goToResult,
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
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button
          style={{}}
          title="submit"
          onPress={() => console.log("ModalAnsSheet")}
        />
      </View> */}
      <AnswerSheet
        inTest={inTest}
        studentAns={studentAns}
        correctAns={correctAns}
        bookmarks={bookmarks}
        time={time}
        setModalVisible={setModalVisible}
        changeQuestNum={changeQuestNum}
        goToResult={goToResult}
      />
    </Modal>
  );
};

ModalAnsSheet.propTypes = {
  inTest: PropTypes.bool.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  studentAns: PropTypes.object.isRequired,
  correctAns: PropTypes.object,
  bookmarks: PropTypes.object.isRequired,
  time: PropTypes.number.isRequired,
  changeQuestNum: PropTypes.func.isRequired,
  goToResult: PropTypes.func,
};

export default ModalAnsSheet;
