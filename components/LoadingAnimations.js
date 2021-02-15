import { Animated, View, Image, StyleSheet, Easing } from "react-native";
import React, { useRef, useEffect } from "react";

const LoadingAnimation = (props) => {
  const spinValue = useRef(new Animated.Value(0)); // The current rotation in degrees

  // Defines and starts the animation.
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue.current, {
        toValue: 1,
        duration: props.duration,
        easing: Easing.linear, //Easing.inOut(Easing.sin),
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = () => {
    return spinValue.current.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
  };

  return (
    <View>
      <Animated.Image
        source={require("../assets/loading.png")}
        style={[styles.image, { transform: [{ rotate: spin() }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default LoadingAnimation;
