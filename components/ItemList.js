import React from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";

const ItemList = (props) => {
  let index = 0;

  return (
    <ScrollView>
      {props.data.map((item) => {
        index++;
        return (
          // list items use the TouchableHighLight component
          // onPress function deletes an item from the list using the onItemPress prop
          <TouchableHighlight onPress={() => props.onItemPress(item.key)}>
            <View
              key={item.key}
              style={index % 2 == 0 ? styles.itemEven : styles.itemOdd}
            >
              <Text>{item.text}</Text>
            </View>
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  itemOdd: {
    backgroundColor: "#b2fffd",
  },
  itemEven: {
    backgroundColor: "white",
  },
});
