import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

const CountdownTimer = (props) => {
  const [timeLeft, setTimeLeft] = useState(props.startingTime);

  const decrementTime = (decrement) => setTimeLeft(timeLeft - decrement);

  useEffect(() => {
    if (timeLeft === 0) {
      props.onTimerEnd();
    } else {
      setTimeout(() => decrementTime(1), 1000);
    }
  }, [timeLeft]);

  return (
    <View style={styles.root}>
      <Text style={styles.timer}>{timeLeft}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 40,
  },
});

export default CountdownTimer;
