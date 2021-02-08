import React, { useState, useEffect } from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";

const InputText = (props) => {
  const [userText, setUserText] = useState("");

  const inputTextChangeHandler = (inputText) => {
    setUserText(inputText);
  };

  const onSubmitPressedHandler = () => {
    if (userText != "") {
      props.onSubmitPressed(userText);
      // setUserText("");
    }
  };

  useEffect(() => {
    if (props.text !== undefined) {
      setUserText(props.text);
    } else {
      setUserText("");
    }
  }, [props.text]);

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        onChangeText={inputTextChangeHandler}
        value={userText}
      />

      {/* Inline-funktio määritetty nuolisyntaksilla */}
      {/* <Button onPress={() => console.log("Button pressed")}
                style={styles.submitButton} 
                title={props.submitText}/> */}

      {/* onPress handler määritetty funktiona komponentin määrittämässä tiedostossa.
                Huom! parametrina välitettäviä funktioita ei suoriteta tässä vaiheessa, viittaus
                niihin välitetään komponentille. */}
      {/* <Button onPress={HandleButtonPressed} 
                style={styles.submitButton} 
                title={props.submitText}/> */}

      {/* Nappia painettaessa suoritettava funktio välitetään parent-komponentista */}
      <Button
        onPress={onSubmitPressedHandler}
        style={styles.submitButton}
        title={props.submitText}
      />
    </View>
  );
};

const HandleButtonPressed = () => {
  console.log("Button pressed");
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    width: "80%",
  },
  submitButton: {
    // width: "20%"
  },
});

export default InputText;
