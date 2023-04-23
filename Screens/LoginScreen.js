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
} from "react-native";

const initialFormData = {
  email: "",
  password: "",
};

const LoginScreen = ({navigation}) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const onHandleInputEmail = (value) => {
    setFormData((prev) => ({ ...prev, email: value }));
  };

  const onHandleInputPassword = (value) => {
    setFormData((prev) => ({ ...prev, password: value }));
  };

  const onFormSubmit = () => {
    console.log(formData);
    setFormData(initialFormData);
  };

  const detectPositionBtnTitle = () => {
    const screenWidth = Dimensions.get("window").width;
    return screenWidth / 2 - 24 - 23;
  };

  const detectPositionPhotoProfile = () => {
    const screenWidth = Dimensions.get("window").width;
    return screenWidth / 2 - 60;
  };

  const onShowPassword = () => {
    setIsShowPassword((prev) => !prev);
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
            <View style={styles.form}>
              <View style={styles.formTitle}>
                <Text style={styles.titleText}>Войти</Text>
              </View>

              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  inputMode={"email"}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={onHandleInputEmail}
                />
              </View>

              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  value={formData.password}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={isShowPassword ? false : true}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={onHandleInputPassword}
                />
                <Text style={styles.showPasswordText} onPress={onShowPassword}>
                  Показать
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.btn}
                onPress={onFormSubmit}
              >
                <Text
                  style={{ ...styles.btnTitle, left: detectPositionBtnTitle() }}
                >
                  Войти
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  ...styles.accauntEnter,
                  marginBottom: isShowKeyboard ? -97 : 144,
                }}
              >
                <Text
                  style={styles.accauntEnterText}
                  onPress={() => navigation.navigate("Registration")}
                >
                  Нет аккаунта? Зарегистрироваться
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

  form: {
    paddingTop: 32,
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
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
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
    position: "relative",
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
  },

  btnTitle: {
    position: "absolute",
    top: 16,

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

export default LoginScreen;
