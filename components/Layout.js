import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Layout = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        <Text style={styles.headlineText} numberOfLines={1}>
          Otsikko
        </Text>
      </View>
      <View style={styles.information}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.box}>
          <Text>2</Text>
        </View>
        <View style={styles.box}>
          <Text>3</Text>
        </View>
        <View style={styles.box}>
          <Text>4</Text>
        </View>
        <View style={styles.box}>
          <Text>5</Text>
        </View>
        <View style={styles.box}>
          <Text>6</Text>
        </View>
        <View style={styles.box}>
          <Text>7</Text>
        </View>
        <View style={styles.box}>
          <Text>8</Text>
        </View>
        <View style={styles.box}>
          <Text>9</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headline: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },

  headlineText: {
    fontWeight: "bold",
  },

  information: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },

  text: {
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },

  box: {
    width: "33%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  boxContainer: {
    flexDirection: "row",
    flex: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

export default Layout;
