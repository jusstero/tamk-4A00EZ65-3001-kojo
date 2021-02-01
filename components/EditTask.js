import React, { useState } from "react";
import { Modal, StyleSheet, View, Button } from "react-native";

import InputText from "./InputText";

const EditTask = (props) => {
  const onClosePressed = () => {
    props.closeView();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={onClosePressed}
    >
      <View style={styles.root}>
        <InputText
          submitText={props.text == undefined ? "Add" : "Edit"}
          onSubmitPressed={props.onSubmitPressed}
          text={props.text}
        />
        <Button title="Close" onPress={onClosePressed} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default EditTask;
