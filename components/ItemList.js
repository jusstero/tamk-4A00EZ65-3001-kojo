import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";

const ItemList = (props) => {
  let index = 0;

  return (
    <FlatList
      data={props.data}
      renderItem={({ item, index }) => {
        return (
          // list items use the TouchableHighLight component
          // onPress function deletes an item from the list using the onItemPress prop
          <TouchableHighlight
            onPress={() => props.onItemPress(item.key)}
            onLongPress={() => props.onLongPress(item.key)}
          >
            <View
              key={item.key}
              style={[
                index % 2 == 0 ? styles.itemEven : styles.itemOdd,
                styles.itemCommon,
              ]}
            >
              <Text>
                {item.title} {item.text} Priority: {item.priority}
                {item.picPath}
              </Text>
              <Text>
                Coordinates: {item.location.latitude} {item.location.longitude}
              </Text>
              <Text>Deadline: {item.date}</Text>
            </View>
          </TouchableHighlight>
        );
      }}
    ></FlatList>
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
  itemCommon: {
    height: 50,
    justifyContent: "center",
    paddingTop: 25,
  },
  text: {},
});
