import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import Constants from "expo-constants";
import uuid from "uuid";

// Importataan omat moduulit järjestelmämoduulien jälkeen
import ItemList from "./components/ItemList";
import EditTask from "./components/EditTask";
import CameraView from "./components/CameraView";
import ImageView from "./components/ImageView";

import { saveTasks, loadTasks } from "./data/TaskStorage";

import { Priority } from "./data/Enums";

export default function App() {
  const [images, setImages] = useState([
    "https://reactnative.dev/img/tiny_logo.png",
    "https://placeimg.com/640/640/nature",
    "https://placeimg.com/640/640/animals",
    "https://placeimg.com/640/640/beer",
  ]);

  // Tallennetaan käyttäjän syöttämä teksti siten, että se ei häviä uudelleen piirron
  // yhteydesä
  const [tasks, setTasks] = useState([]);

  // Oletuksena EditTask-näkymä ei ole aktiivinen
  const [isEditViewVisible, setEditViewVisibility] = useState(false);

  // Viittaus valittuun taskiin. Jos undefined, mitään ei ole valittu
  const [selectedTask, setSelectedTask] = useState(undefined);

  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const loadData = async () => {
    console.log("Loading Tasks");
    let tasks = await loadTasks();
    console.log("Tasks loaded");

    setTasks(tasks);
  };

  // Executed only once when app starts
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log("Saving tasks");
    saveTasks(tasks);
    console.log(tasks);
  }, [tasks]);

  const newImageHandler = (imagePath) => {
    setImages([...images, imagePath]);
  };
  // ... spread operator. Pulls items out of an array. In our case it is used to create a
  // new array
  const addTaskHandler = (task) => {
    // TODO: Replace mock values with real data
    let newTask = createTask("", task, "", "", "", Date.now(), Priority.medium);

    console.log(newTask);

    if (selectedTask !== undefined) {
      selectedTask.text = task;

      let updatedTasks = tasks.filter((task) => task.key !== selectedTask.key);
      setTasks([...updatedTasks, newTask]);

      // This has to be done because the tasks list itself doensn't change and
      // thus useEffect is not triggered.
      // SaveTasks(tasks);
    } else {
      setTasks([...tasks, newTask]);
    }

    // Taskin lisäämisen jälkeen suljetaan Edit-näkymä
    showEditView(false);
  };

  const createTask = (
    title,
    text,
    picPath,
    latitude,
    longitude,
    date,
    priority
  ) => {
    return {
      key: uuid.v4(),
      title,
      text,
      picPath,
      coordinate: {
        latitude,
        longitude,
      },
      date,
      priority,
    };
  };

  const onRemove = (key) => {
    setTasks(tasks.filter((item) => item.key !== key));
  };

  const onItemPressed = (key) => {
    let currentTask = tasks.find((task) => task.key == key);
    setSelectedTask(currentTask);
    showEditView(true);
  };

  const showEditView = (isShown) => {
    // Tyhjentää valitun taskin sulkemisen yhteydessä
    if (!isShown) {
      setSelectedTask(undefined);
    }

    setEditViewVisibility(isShown);
  };

  const closeCamera = () => {
    setIsCameraVisible(false);
  };

  return (
    // Vain yksi juuriobjekti sallittu!
    // View-elementtiä kannattaa ajatella div-elementtinä html:ssä
    // Tyyli määritellään JavaScript-olion sisälle
    <View style={stylesLight.root}>
      {/* <Lesson1 /> */}
      {/* Kommentti toimii oikein aaltosulkeiden sisällä */}
      {/* <Text style={stylesLight.text}>First view</Text>
      <Text style={stylesLight.text}>Second text</Text>
      <Text style={stylesLight.text}>Third View</Text> */}
      <View style={stylesLight.statusBar}>
        <StatusBar style="auto" />
      </View>

      <ItemList data={tasks} onPress={onItemPressed} onLongPress={onRemove} />
      <EditTask
        onSubmitPressed={addTaskHandler}
        isVisible={isEditViewVisible}
        closeView={() => showEditView(false)}
        text={selectedTask !== undefined ? selectedTask.text : undefined}
      />

      <ImageView photoArray={images} />

      <Button title="Add task" onPress={() => showEditView(true)} />

      <CameraView
        isVisible={isCameraVisible}
        onClosePressed={closeCamera}
        photoArray={images}
        onPictureTaken={newImageHandler}
      />
      <Button title="Open camera" onPress={() => setIsCameraVisible(true)} />
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
