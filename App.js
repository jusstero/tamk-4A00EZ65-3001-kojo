import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import Constants from "expo-constants";
import uuid from "uuid";

import InputText from "./components/InputText";
import ItemList from "./components/ItemList";
import EditTask from "./components/EditTask";
import CountdownTimer from "./components/CountdownTimer";

import { saveTasks, loadTasks } from "./data/TaskStorage";
import { Priority, getPriority, getPriorityByName } from "./data/Enums";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const [userInput, setUserInput] = useState("");

  const [isEditViewVisible, setEditViewVisibility] = useState(false);

  const [selectedTask, setSelectedTask] = useState(undefined);

  const loadData = async () => {
    console.log("Loading tasks");
    let tasks = await loadTasks();
    console.log("Tasks loaded");

    setTasks(tasks);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log("Saving tasks");
    saveTasks(tasks);
  }, [tasks]);

  // ... spread operator. Pulls items out of an array. In our case it is used to create a
  // new array
  const addTaskHandler = (task) => {
    if (selectedTask !== undefined) {
      selectedTask.text = task;
      saveTasks(tasks);
    } else {
      setTasks([
        ...tasks,
        {
          // missing date variable for task deadline
          key: uuid.v4(),
          title: "title",
          text: task,
          location: {
            latitude: 55.55,
            longitude: 66.66,
          },
          picPath: "path abc",
          priority: Priority.medium,
        },
      ]);
    }

    showEditView(false);
  };

  // removes an item from the array based on the item key using the Array.filter method
  // function is given to ItemList props as onItemPress
  const removeTaskHandler = (key) => {
    setTasks(tasks.filter((task) => task.key !== key));
  };

  const onItemPressed = (key) => {
    let currentTask = tasks.find((task) => task.key == key);
    setSelectedTask(currentTask);
    showEditView(true);
  };

  const showEditView = (isShown) => {
    if (!isShown) {
      setSelectedTask(undefined);
    }
    setEditViewVisibility(isShown);
  };

  const onTimerEnd = () => {
    console.log("Timer stopped");
  };

  return (
    <View style={stylesLight.root}>
      <View style={stylesLight.statusBar}>
        <StatusBar style="auto" />
      </View>
      <ItemList
        data={tasks}
        onItemPress={onItemPressed}
        onLongPress={removeTaskHandler}
      />
      <EditTask
        onSubmitPressed={addTaskHandler}
        isVisible={isEditViewVisible}
        closeView={() => showEditView(false)}
        text={selectedTask !== undefined ? selectedTask.text : undefined}
      />
      <Button title="Add task" onPress={() => showEditView(true)} />
    </View>
  );
}

const stylesLight = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
    height: "100%",
    paddingTop: Constants.statusBarHeight,
  },
  statusBar: {
    // height: Constants.statusBarHeight
  },
  text: {
    width: 100,
    color: "black",
  },
});

const stylesDark = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "black",
    height: "100%",
  },
  text: {
    width: 100,
    color: "#FFF",
  },
});
