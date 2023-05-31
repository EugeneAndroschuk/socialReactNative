import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Keyboard,
  FlatList,
} from "react-native";
import SvgAddProfilePhoto from "../assets/images/Svg/SvgAddProfilePhoto";
import SvgRemoveProfilePhoto from "../assets/images/Svg/SvgRemoveProfilePhoto";
import SvgLogOut from "../assets/images/Svg/SvgLogOut";
import SvgComment from "../assets/images/Svg/SvgComment";
import SvgLike from "../assets/images/Svg/SvgLike";
import SvgMapPin from "../assets/images/Svg/SvgMapPin";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { getUserId } from "../redux/auth/selectors";
import { db } from "../firebase/config";
import { signOutUser } from "../redux/auth/authSlice";

const ProfileScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [posts, setPosts] = useState([]);
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();

  const getUserPostsFromFirestore = async () => {
    try {
      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      const snapshotPosts = [];
      snapshot.forEach((doc) =>
        snapshotPosts.push({ ...doc.data(), id: doc.id })
      );
      setPosts(snapshotPosts);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getUserPostsFromFirestore();
  }, [])
  
  const onLogOut = () => {
    dispatch(signOutUser());
  };

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
        <SvgLogOut style={styles.svgLogOut} onPress={onLogOut} />
        <View style={styles.formTitle}>
          <Text style={styles.userName}>Natali Romanova</Text>
        </View>

        <View style={styles.form}>
          <FlatList
            data={posts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View style={styles.post}>
                <View style={styles.photoWrap}>
                  <Image source={{ uri: item.photoUrl }} style={styles.photo} />
                </View>
                <Text style={styles.photoTitle}>{item.title}</Text>

                <View style={styles.data}>
                  <View style={styles.feedback}>
                    <SvgComment style={{ marginRight: 9 }} />
                    <Text style={{ marginRight: 27 }}>8</Text>
                    <SvgLike style={{ marginRight: 10 }} />
                    <Text>153</Text>
                  </View>

                  <View style={styles.location}>
                    <SvgMapPin style={{ marginRight: 8 }} />
                    <Text>{item.local}</Text>
                  </View>
                </View>
              </View>
            )}
          />
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

  svgLogOut: {
    position: "absolute",
    top: 22,
    right: 16,
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

  photoWrap: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
  },

  photo: {
    height: 240,
    borderRadius: 8,
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
    justifyContent: "space-between",
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
