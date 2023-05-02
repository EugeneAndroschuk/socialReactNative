import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Keyboard,
} from "react-native";
import SvgAddProfilePhoto from "../assets/images/Svg/SvgAddProfilePhoto";
import SvgRemoveProfilePhoto from "../assets/images/Svg/SvgRemoveProfilePhoto";
import SvgComment from "../assets/images/Svg/SvgComment";
import SvgLike from "../assets/images/Svg/SvgLike";
import SvgMapPin from "../assets/images/Svg/SvgMapPin";

const ProfileScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const detectPositionPhotoProfile = () => {
    const screenWidth = Dimensions.get("window").width;
    return screenWidth / 2 - 60;
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          ...styles.imageBgd,
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
        source={require("../assets/images/reg-bgd2x.jpg")}
      />

      <View style={styles.formWrap}>
        <View
          style={{
            ...styles.photoProfile,
            left: detectPositionPhotoProfile(),
          }}
        >
          <SvgRemoveProfilePhoto style={styles.addBtn} />
        </View>
        <View style={styles.formTitle}>
          <Text style={styles.userName}>Natali Romanova</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.post}>
            <View style={styles.photo}></View>
            <Text style={styles.photoTitle}>Лес</Text>

            <View style={styles.data}>
              <View style={styles.feedback}>
                <SvgComment style={{ marginRight: 9 }} />
                <Text style={{ marginRight: 27 }}>8</Text>
                <SvgLike style={{ marginRight: 10 }} />
                <Text>153</Text>
              </View>

              <View style={styles.location}>
                <SvgMapPin style={{ marginRight: 8 }} />
                <Text>Ukraine</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },

  imageBgd: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  formWrap: {
    // display: "none",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },

  photoProfile: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },

  addBtn: {
    position: "absolute",
    top: 75,
    left: 101,
    borderRadius: 25,
    color: "#fff",
  },

  form: {
    marginHorizontal: 16,
    marginBottom: 83,
  },

  formTitle: {
    alignItems: "center",
    marginBottom: 33,
  },

  userName: {
    marginTop: 92,
    marginBottom: 33,
    fontFamily: "Roboto-Medium-500",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },

  post: {
    marginBottom: 46,
  },

  photo: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 8,
  },

  photoTitle: {
    fontFamily: "Roboto-Medium-500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  data: {
    // flex: 1,
    // justifyContent: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
    // alignItems: 'center',
  },

  feedback: {
    // flex: 1,
    // justifyContent: 'center',
    flexDirection: "row",
    // alignItems: 'center',
  },

  location: {
    // flex: 1,
    // justifyContent: 'center',
    flexDirection: "row",
    // alignItems: 'center',
  },
});
