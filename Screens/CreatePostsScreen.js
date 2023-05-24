import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";

import SvgArrowLeft from "../assets/images/Svg/SvgArrowLeft";
import SvgTrash from "../assets/images/Svg/SvgTrash";
import SvgMapPin from "../assets/images/Svg/SvgMapPin";
import SvgCamera from "../assets/images/Svg/SvgCamera";

const CreatePostsScreen = ({navigation}) => {
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [isPhoto, setIsPhoto] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [formData, setFormData] = useState({});
  const [location, setLocation] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    async function request() {
      const answer = await Camera.requestCameraPermissionsAsync();
      setHasPermission(answer.status === "granted");
    };
    request();
  }, []);

  if (hasPermission === null) return <View/>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  const takePhoto = async () => {
    console.log('нажал на камеру');
    const photo = await cameraRef.takePictureAsync();
    setCurrentPhoto(photo.uri);
    setIsPhoto(true);
  }

  const onPressEditPhoto = () => {
    if (isPhoto) {
      setIsPhoto(false);
      setCurrentPhoto(null);
}
  }

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const onHandleInputPhotoTitle = (value) => {
    setFormData((prev) => ({ ...prev, photoTitle: value }));
  };

  const onHandleInputPhotoLocation = (value) => {
    setFormData((prev) => ({ ...prev, photoLocation: value }));
  };

  const onPressPublicate = () => {
    // detecting geolocation
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);

      // sending data
      navigation.navigate("Posts", { currentPhoto, formData, coords });
    })();
    // отправляем данные
    // navigation.navigate("Posts", { currentPhoto, formData, coords});
    // console.log({ currentPhoto, formData, coords});

  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Створити публікацію</Text>
          <TouchableOpacity
            style={styles.svgArrowLeft}
            onPress={() => navigation.navigate("Posts")}
          >
            <SvgArrowLeft />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Camera style={styles.photo} ref={(ref) => setCameraRef(ref)}>
            <Image
              source={{ uri: currentPhoto }}
              style={{ width: 100, height: 240 }}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.cameraWrap}
              onPress={takePhoto}
            >
              <SvgCamera style={styles.camera} />
            </TouchableOpacity>
          </Camera>

          <Text style={styles.photoUploadText} onPress={onPressEditPhoto}>
            {isPhoto ? "Редагувати фото" : "Завантажте фото"}
          </Text>

          <TextInput
            style={styles.input}
            value={formData.photoTitle}
            placeholder="Назва..."
            placeholderTextColor="rgba(189, 189, 189, 1)"
            onFocus={() => setIsShowKeyboard(true)}
            onBlur={() => setIsShowKeyboard(false)}
            onChangeText={onHandleInputPhotoTitle}
          />

          <View>
            <TextInput
              style={{ ...styles.input, paddingLeft: 28 }}
              value={formData.photoLocation}
              placeholder="Місцевість..."
              placeholderTextColor="rgba(189, 189, 189, 1)"
              onFocus={() => setIsShowKeyboard(true)}
              onBlur={() => setIsShowKeyboard(false)}
              onChangeText={onHandleInputPhotoLocation}
            />
            <SvgMapPin style={styles.svgMapPin} />
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              ...styles.btnPublicate,
              backgroundColor: isPhoto ? "#FF6C00" : "#F6F6F6",
            }}
            onPress={onPressPublicate}
          >
            <Text
              style={{
                ...styles.btnPublicateText,
                color: isPhoto ? "#FFFFFF" : "#BDBDBD",
              }}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{ ...styles.tabBar, width: Dimensions.get("window").width }}
        >
          <TouchableOpacity activeOpacity={0.9} style={styles.btn}>
            <SvgTrash />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: "#FFFFFF",
  },

  title: {
    alignItems: "center",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.3)",

    paddingBottom: 11,
  },

  titleText: {
    fontFamily: "Roboto-Medium-500",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },

  svgArrowLeft: {
    position: "absolute",
    top: 0,
    left: 16,
  },

  form: {
    paddingTop: 32,
    marginHorizontal: 16,
  },

  photo: {
    // width: 330,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },

  postText: {},

  input: {
    height: 51,
    fontFamily: "Roboto-Regular-400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomColor: "rgba(189, 189, 189, 1)",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },

  svgMapPin: {
    position: 'absolute',
    left: 0,
    top: 14,
  },

  photoUploadText: {
    marginBottom: 33,
    fontFamily: "Roboto-Regular-400",
    fontSize: 16,
    lineHeight: 19,
    color: "rgba(189, 189, 189, 1)",
  },

  // photoTitle: {
  //   marginBottom: 47,
  // },

  location: {
    flexDirection: "row",
  },

  photoTerritory: {
    marginLeft: 4,
    marginBottom: 15,
  },

  // border: {
  //   borderWidth: 1,
  //   borderStyle: "solid",
  //   borderColor: "#E8E8E8",
  //   marginBottom: 32,
  // },

  btnPublicate: {
    height: 51,
    // backgroundColor: "#F6F6F6",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 33,
  },

  btnPublicateText: {
    fontFamily: "Roboto-Regular-400",
    fontSize: 16,
    lineHeight: 19,
    // color: "rgba(189, 189, 189, 1)",
  },

  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,

    paddingTop: 9,
    paddingBottom: 34,

    alignItems: "center",
  },

  btn: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});
