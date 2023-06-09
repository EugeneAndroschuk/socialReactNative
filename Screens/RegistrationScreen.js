import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  PermissionsAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import SvgAddProfilePhoto from "../assets/images/Svg/SvgAddProfilePhoto";
import SvgRemoveProfilePhoto from "../assets/images/Svg/SvgRemoveProfilePhoto";
import { useDispatch, useSelector } from "react-redux";
import { authSignUpUser } from "../redux/auth/authOperations";
import { useEffect } from "react";
import { getAvatarUrl, getLogin } from "../redux/auth/selectors";
import { onLoadUserAvatar } from "../servises/userServises";

const initialFormData = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isFocusLoginInput, setIsFocusLoginInput] = useState(false);
  const [isFocusEmailInput, setIsFocusEmailInput] = useState(false);
  const [isFocusPasswordInput, setIsFocusPasswordInput] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const login = useSelector(getLogin);
  const dispatch = useDispatch();

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const onHandleInputLogin = (value) => {
    setFormData((prev) => ({ ...prev, login: value }));
  };

  const onHandleInputEmail = (value) => {
    setFormData((prev) => ({ ...prev, email: value }));
  };

  const onHandleInputPassword = (value) => {
    setFormData((prev) => ({ ...prev, password: value }));
  };

  const onFormSubmit = () => {
    dispatch(authSignUpUser(formData, userAvatar));
    setFormData(initialFormData);
  };

  const detectPositionPhotoProfile = () => {
    const screenWidth = Dimensions.get("window").width;
    return screenWidth / 2 - 60;
  };

  const detectPositionAddPhotoProfileBtn = () => {
    const screenWidth = Dimensions.get("window").width;
    return screenWidth / 2 - 60 - 12;
  };

  const onShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const onFocusLoginInput = () => {
    setIsShowKeyboard(true);
    setIsFocusLoginInput(true);
  };

  const onFocusEmailInput = () => {
    setIsShowKeyboard(true);
    setIsFocusEmailInput(true);
  };

  const onFocusPasswordInput = () => {
    setIsShowKeyboard(true);
    setIsFocusPasswordInput(true);
  };

  const onPressProfilePhoto = () => {
    if (userAvatar) { setUserAvatar(null); return; }
    onLoadUserAvatar().then((res) => {
      setUserAvatar(res);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Image
          style={{
            ...styles.imageBgd,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
          source={require("../assets/images/reg-bgd2x.jpg")}
        />
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <View style={styles.formWrap}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onPressProfilePhoto}
              style={{
                ...styles.addBtn,
                right: detectPositionAddPhotoProfileBtn(),
              }}
            >
              {userAvatar ? <SvgRemoveProfilePhoto/> : <SvgAddProfilePhoto />}
            </TouchableOpacity>

            <View
              style={{
                ...styles.photoProfile,
                left: detectPositionPhotoProfile(),
              }}
            >
              <Image source={{ uri: userAvatar }} style={styles.avatar} />
            </View>

            <View style={styles.form}>
              <View style={styles.formTitle}>
                <Text style={styles.titleText}>Реєстрація</Text>
              </View>

              <View style={styles.inputWrap}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusLoginInput ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusLoginInput ? "#FFFFFF" : "#F6F6F6",
                  }}
                  value={formData.login}
                  placeholder="Логін"
                  placeholderTextColor="#BDBDBD"
                  onFocus={onFocusLoginInput}
                  onBlur={() => setIsFocusLoginInput(false)}
                  onChangeText={onHandleInputLogin}
                />
              </View>

              <View style={styles.inputWrap}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusEmailInput ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusEmailInput ? "#FFFFFF" : "#F6F6F6",
                  }}
                  value={formData.email}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  inputMode={"email"}
                  onFocus={onFocusEmailInput}
                  onBlur={() => setIsFocusEmailInput(false)}
                  onChangeText={onHandleInputEmail}
                />
              </View>

              <View style={styles.inputWrap}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusPasswordInput ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusPasswordInput
                      ? "#FFFFFF"
                      : "#F6F6F6",
                  }}
                  value={formData.password}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={isShowPassword ? false : true}
                  onFocus={onFocusPasswordInput}
                  onBlur={() => setIsFocusPasswordInput(false)}
                  onChangeText={onHandleInputPassword}
                />
                <Text style={styles.showPasswordText} onPress={onShowPassword}>
                  Показати
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.btn}
                onPress={onFormSubmit}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>

              <View
                style={{
                  ...styles.accauntEnter,
                  marginBottom: isShowKeyboard ? -97 : 78,
                }}
              >
                <Text
                  style={styles.accauntEnterText}
                  onPress={() => navigation.navigate("Login")}
                >
                  Вже є акаунт? Увійти
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

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

  // photoProfileWrap: {
  //   position: "absolute",
  //   top: -60,
  //   width: 150,
  //   height: 120,
  //   backgroundColor: "green",
  //   alignItems: 'center',
  // },

  photoProfile: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  addBtn: {
    position: "absolute",
    top: 21,
    // right: 3,
    // top: 81,
    // left: 10,
    zIndex: 3,
    borderRadius: 25,
    color: "#fff",
  },

  form: {
    paddingTop: 92,
    marginHorizontal: 16,
  },

  formTitle: {
    alignItems: "center",
    marginBottom: 33,
  },

  titleText: {
    fontFamily: "Roboto-Medium-500",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },

  inputWrap: {
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,

    fontFamily: "Roboto-Regular-400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  showPasswordText: {
    position: "absolute",
    top: 16,
    right: 16,
    fontFamily: "Roboto-Regular-400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },

  btn: {
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  btnTitle: {
    fontFamily: "Roboto-Regular-400",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },

  accauntEnter: {
    alignItems: "center",
  },

  accauntEnterText: {
    fontFamily: "Roboto-Regular-400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default RegistrationScreen;
