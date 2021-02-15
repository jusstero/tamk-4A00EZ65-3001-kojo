import { Camera } from "expo-camera";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Modal,
  Image,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { IMAGE_DIRECTORY } from "../data/Constants";
import LoadingAnimation from "./LoadingAnimations";

const FRONT_CAMERA = "front";
const BACK_CAMERA = "back";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const CameraView = (props) => {
  // UseStates
  const [hasCameraPermission, setHasCameraPermission] = useState(undefined);
  const [cameraType, setCameraType] = useState(BACK_CAMERA);
  const [latestPicture, setLatestPicture] = useState(undefined);

  // UseRefs
  const camera = useRef(undefined);

  const onShowCamera = () => {
    const getPermission = async () => {
      try {
        const { status } = await Camera.requestPermissionsAsync();
        setHasCameraPermission(status === "granted");
      } catch (error) {
        console.log(error);
      }
    };

    getPermission();
  };

  const toggleCameras = () => {
    if (cameraType === BACK_CAMERA) {
      setCameraType(FRONT_CAMERA);
    } else {
      setCameraType(BACK_CAMERA);
    }
  };

  const snap = () => {
    const snap_async = async () => {
      if (camera !== undefined) {
        try {
          let photo = await camera.current.takePictureAsync();
          console.log(photo.uri);

          // Copy taken picture to a permanent location

          let imageFolderInfo = await FileSystem.getInfoAsync(IMAGE_DIRECTORY);
          if (!imageFolderInfo.exists) {
            // Image directory does not exist. Let's create one
            // Options: if intermediates == true, creates all non-existing directories
            // in the URI
            try {
              await FileSystem.makeDirectoryAsync(IMAGE_DIRECTORY, {
                intermediates: true,
              });
            } catch (error) {
              console.log(error);
            }
          }

          let photoName = Date.now().toString() + ".jpg";
          let fullPath = IMAGE_DIRECTORY + photoName;

          console.log(`From: ${photo.uri} To: ${fullPath}`);

          try {
            await FileSystem.moveAsync({ from: photo.uri, to: fullPath });
            setLatestPicture(fullPath);
            props.onPictureTaken(fullPath);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    snap_async();
  };

  if (hasCameraPermission === undefined) {
    return (
      <Modal
        onShow={onShowCamera}
        animationType="fade"
        visible={props.isVisible}
        onRequestClose={props.onClosePressed}
      >
        <View>
          <LoadingAnimation
            duration={1000}
            style={{ width: 400, height: 400 }}
          />
          <Text>Waiting for camera permission</Text>
        </View>
      </Modal>
    );
  } else if (hasCameraPermission === false) {
    return (
      <Modal
        animationType="fade"
        visible={props.isVisible}
        onRequestClose={props.onClosePressed}
      >
        <View>
          <LoadingAnimation
            duration={1000}
            style={{ width: 400, height: 400 }}
          />
          <Text>No access to camera!</Text>
        </View>
      </Modal>
    );
  } else {
    // We have a permission to use camera! Let's render it
    return (
      <Modal
        animationType="fade"
        visible={props.isVisible}
        onRequestClose={props.onClosePressed} // The app reacts to back button press on Android
      >
        <View style={styles.root}>
          <View style={styles.topButtonsContainer}>
            <Button title="Switch" onPress={toggleCameras} />
          </View>
          <Camera style={styles.camera} type={cameraType} ref={camera}></Camera>
          <View style={styles.bottomButtonsContainer}>
            <Button title="Snap!" onPress={snap} />
          </View>
          <View style={styles.latest}>
            <Image source={{ uri: latestPicture }} style={styles.prevPic} />
          </View>
        </View>
      </Modal>
    );
  }
};

export default CameraView;

const styles = StyleSheet.create({
  root: {},
  topButtonsContainer: {},
  camera: {
    width: WINDOW_WIDTH,
    height: (4 / 3) * WINDOW_WIDTH,
  },
  bottomButtonsContainer: {},
  latest: {
    flexDirection: "row",
    justifyContent: "center",
  },
  prevPic: {
    width: 120,
    height: 90,
  },
});
