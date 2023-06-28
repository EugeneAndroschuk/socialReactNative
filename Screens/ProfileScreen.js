import { useState, useEffect, useRef } from "react";
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
import { getUserId, getLogin, getAvatarUrl } from "../redux/auth/selectors";
import { db } from "../firebase/config";
import { signOutUser, updateAvatar } from "../redux/auth/authSlice";
import { onLoadUserAvatar, updateUserProfile, createUserProfile } from "../servises/userServises";
import { TouchableOpacity } from "react-native";

const ProfileScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userAvatar, setUserAvatar] = useState(null);
  const userId = useSelector(getUserId);
  const login = useSelector(getLogin);
  const avatarUrl = useSelector(getAvatarUrl);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current === true) { isFirstRender.current = false;  return}
    updateUserProfile(userId, userAvatar);
    dispatch(updateAvatar({ avatarUrl: userAvatar }));
  },[userAvatar]);

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

  const detectPositionPhotoProfile = () => {
    const screenWidth = Dimensions.get("window").width;
    return screenWidth / 2 - 60;
  };

  const detectPositionAddPhotoProfileBtn = () => {
    const screenWidth = Dimensions.get("window").width;
    return screenWidth / 2 - 60 - 12;
  };

  const onPressProfilePhoto = () => {
    if (userAvatar || avatarUrl) {
      setUserAvatar(null);
      dispatch(updateAvatar({ avatarUrl : null}));
      return;
    }
    onLoadUserAvatar().then(res => setUserAvatar(res))
  }

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
        <TouchableOpacity
          onPress={onPressProfilePhoto}
          style={{
            ...styles.addBtn,
            right: detectPositionAddPhotoProfileBtn(),
          }}
        >
          {userAvatar || avatarUrl ? (
            <SvgRemoveProfilePhoto />
          ) : (
            <SvgAddProfilePhoto />
          )}
        </TouchableOpacity>
        <View
          style={{
            ...styles.photoProfile,
            left: detectPositionPhotoProfile(),
          }}
        >
          {(userAvatar !== null || avatarUrl !== null) && (
            <Image
              source={{ uri: userAvatar === null ? avatarUrl : userAvatar }}
              style={styles.avatar}
            />
          )}
        </View>
        <SvgLogOut style={styles.svgLogOut} onPress={onLogOut} />
        <View style={styles.formTitle}>
          <Text style={styles.userName}>{login}</Text>
        </View>
        <View style={styles.form}>
          <FlatList
            style={{ height: Dimensions.get("window").height - 390 }}
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
                    <SvgComment
                      style={{ marginRight: 9 }}
                      fill={item.totalComments === 0 ? "none" : "#FF6C00"}
                      stroke={item.totalComments === 0 ? "#BDBDBD" : "#FF6C00"}
                    />
                    <Text style={{ marginRight: 27 }}>
                      {item.totalComments}
                    </Text>
                    <SvgLike style={{ marginRight: 10 }} />
                    <Text>{item.totalLikes}</Text>
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

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  addBtn: {
    position: "absolute",
    top: 21,
    borderRadius: 25,
    color: "#fff",
    zIndex: 2,
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
    marginTop: 92,
    marginBottom: 32,
  },

  userName: {
    fontFamily: "Roboto-Medium-500",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },

  post: {
    marginBottom: 35,
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
    marginBottom: 11,
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
