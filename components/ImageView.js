import React, { useState, useRef } from "react";
import { View, Image, StyleSheet, Button } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
});

const ImageView = (props) => {
  const [currentImage, setCurrentImage] = useState(0);

  const onNextPress = () => {
    if (currentImage == props.photoArray.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage((currentImage) => currentImage + 1);
    }
  };
  const onPreviousPress = () => {
    if (currentImage == 0) {
      setCurrentImage(props.photoArray.length - 1);
    } else {
      setCurrentImage((currentImage) => currentImage - 1);
    }
  };
  return (
    // Missing animation when switching pictures!
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: props.photoArray[currentImage],
        }}
      />
      <Button title="Next" onPress={() => onNextPress()} />
      <Button title="Previous" onPress={() => onPreviousPress()} />
    </View>
  );
};

export default ImageView;
