import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LayOut from "./components/Layout.js";

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <LayOut></LayOut>
    </View>
  );
}
