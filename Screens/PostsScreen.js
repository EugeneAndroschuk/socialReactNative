import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import SvgLogOut from "../assets/images/Svg/SvgLogOut";
import SvgComment from "../assets/images/Svg/SvgComment";
import SvgMapPin from "../assets/images/Svg/SvgMapPin";
import SvgLike from "../assets/images/Svg/SvgLike";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../redux/auth/authSlice";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore"; 
import { db } from "../firebase/config";
import { getLogin, getEmail, getAvatarUrl } from "../redux/auth/selectors";

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const login = useSelector(getLogin);
  const email = useSelector(getEmail);
  const avatarUrl = useSelector(getAvatarUrl);

  const getDataFromFirestore = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      
      const snapshotPosts = [];
      snapshot.forEach((doc) => snapshotPosts.push({ ...doc.data(), id: doc.id }));
      setPosts(snapshotPosts);

    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getDataFromFirestore();
  }, [posts]);

  const onLogOut = () => {
    dispatch(signOutUser());
  }

  const onOpenMap = (coords) => {
    navigation.navigate("Map", { coords });
  };

  const onOpenComments = (id, url) => {
    navigation.navigate("Comments", {id, url});
  }

  const onPressLike = async (postId) => {
    try {
      await updateDoc(doc(db, "posts", postId), {
        totalLikes: increment(1),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Публікації</Text>
        <SvgLogOut style={styles.svgLogOut} onPress={onLogOut} />
      </View>

      <View style={styles.posts}>
        <View style={styles.user}>
          <View style={styles.userPhoto}>
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          </View>
          <View style={styles.userTitle}>
            <Text style={styles.userName}>{login}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.form}>
        <FlatList
          style={{ height: Dimensions.get("window").height - 265 }}
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
                    onPress={() => onOpenComments(item.id, item.photoUrl)}
                    style={{ marginRight: 9 }}
                    fill={item.totalComments === 0 ? "none" : "#FF6C00"}
                    stroke={item.totalComments === 0 ? "#BDBDBD" : "#FF6C00"}
                  />
                  <Text style={{ marginRight: 12 }}>{item.totalComments}</Text>
                  <SvgLike
                    onPress={() => onPressLike(item.id)}
                    style={{ marginRight: 9 }}
                  />
                  <Text>{item.totalLikes}</Text>
                </View>

                <View style={styles.location}>
                  <SvgMapPin
                    onPress={() => onOpenMap(item.location)}
                    style={{ marginRight: 8 }}
                  />
                  <Text>{item.local}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PostsScreen;

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

  svgLogOut: {
    position: "absolute",
    top: 0,
    right: 16,
  },

  posts: {
    paddingTop: 32,
    paddingLeft: 16,
  },

  user: {
    flexDirection: "row",
  },

  userTitle: {
    justifyContent: "center",
  },

  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#E8E8E8",

    marginRight: 8,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },

  userName: {
    fontFamily: "Roboto-Bold-700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },

  userEmail: {
    fontFamily: "Roboto-Regular-400",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },

  form: {
    marginHorizontal: 16,
    marginTop: 32,
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
    flexDirection: "row",
    justifyContent: "space-between",
  },

  feedback: {
    flexDirection: "row",
  },

  location: {
    flexDirection: "row",
  },

  // tabBar: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,

  //   flexDirection: "row",

  //   paddingTop: 9,
  //   paddingBottom: 34,

  //   justifyContent: "center",

  //   borderStyle: "solid",
  //   borderTopWidth: 2,
  //   borderColor: "rgba(0, 0, 0, 0.3)",
  // },

  // svgWrap: {
  //   width: 40,
  //   height: 40,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },

  // btn: {
  //   width: 70,
  //   height: 40,
  //   backgroundColor: "#FF6C00",
  //   borderRadius: 20,

  //   justifyContent: "center",
  //   alignItems: "center",

  //   marginLeft: 31,
  //   marginRight: 31,
  // },
});
