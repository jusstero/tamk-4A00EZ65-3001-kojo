import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "Tasks";

export const loadTasks = async () => {
  try {
    let tasks = await AsyncStorage.getItem(STORAGE_KEY);
    if (tasks == null) {
      tasks = [];
    } else {
      tasks = JSON.parse(tasks);
    }
    return tasks;
  } catch (e) {
    console.log("Error fetching tasks " + e);
    return [];
  }
};

export const saveTasks = (tasks) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
