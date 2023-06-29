import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  doc,
  addDoc,
  getDocs,
  collection,
  updateDoc,
  increment,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { getLogin, getAvatarUrl } from "../redux/auth/selectors";
import addLeadingZero from "../servises/AddeadingZero";

import SvgArrowLeft from "../assets/images/Svg/SvgArrowLeft";
import SvgArrowUp from "../assets/images/Svg/SvgArrowUp";

const CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const login = useSelector(getLogin);
  const postId = route.params.id;
  const photoUrl = route.params.url;
  const avatarUrl = useSelector(getAvatarUrl);
  const DEFAULT_AVATAR_URL =
    "https://firebasestorage.googleapis.com/v0/b/social-rn-25894.appspot.com/o/userAvatar%2Favatar-1x.jpg?alt=media&token=33020311-3b34-4b46-ba27-3a72f9d6f6ef";

  const getCommentsFromFirestore = async () => {
    try {
      const q = query(
        collection(db, "posts", postId, "comments"),
        orderBy("date", "desc")
      );
      const snapshot = await getDocs(q);
      const snapshotComments = [];
      snapshot.forEach((doc) =>
        snapshotComments.push({ ...doc.data(), id: doc.id })
      );
      
      setComments(snapshotComments);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getCommentsFromFirestore();
  }, [comments]);

  const updateDataInFirestore = async (avatarUrl, timeStamp) => {
    try {
      const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
        comment: comment,
        login: login,
        avatarUrl: avatarUrl,
        timeStamp: timeStamp,
        date: serverTimestamp(),
      });
      // const updateTimestamp = await updateDoc(
      //   collection(db, "posts", postId, "comments"),
      //   {
      //     timestampServer: serverTimestamp(),
      //   }
      // );
      await updateDoc(doc(db, "posts", postId), {
        totalComments: increment(1),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onMakeComment = () => {
    const avatar = avatarUrl === null ? DEFAULT_AVATAR_URL : avatarUrl;
    
    const date = new Date();
    const options = {
      month: "long",
      day: "numeric",
    };
    const day = date.toLocaleDateString("uk-UA", options);
    const year = date.getFullYear();
    const hours = addLeadingZero(date.getHours().toString());
    const minutes = addLeadingZero(date.getMinutes().toString());
    const timeStamp = `${day}, ${year} | ${hours}:${minutes}`;
    updateDataInFirestore(avatar, timeStamp);
    
    setComment("");
    keyboardHide();
  };

  const onHandleInputComment = (value) => {
    setComment(value);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Коментарі</Text>
          <TouchableOpacity
            style={styles.svgArrowLeft}
            onPress={() => navigation.navigate("Posts")}
          >
            <SvgArrowLeft />
          </TouchableOpacity>
        </View>

        <View style={styles.photoWrap}>
          <Image style={styles.photo} source={{ uri: photoUrl }} />
        </View>

        <View style={styles.comment}>
          <FlatList
            data={comments}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item, index }) => (
              <View
                style={{
                  ...styles.comments,
                  flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                }}
              >
                <View style={styles.avatar}>
                  <Image
                    style={styles.avatarImage}
                    source={{ uri: item.avatarUrl }}
                  />
                </View>
                <View
                  style={{
                    width: 299,
                    backgroundColor: "rgba(0, 0, 0, 0.03)",
                    paddingTop: 16,
                    paddingRight: 16,
                    paddingBottom: 35,
                    paddingLeft: 16,
                  }}
                >
                  <Text style={styles.commentsText}>{item.comment}</Text>
                  {index % 2 === 0 ? (
                    <Text style={{ ...styles.commentsTime, right: 16 }}>
                      {item.timeStamp}
                    </Text>
                  ) : (
                    <Text style={{ ...styles.commentsTime, left: 16 }}>
                      {item.timeStamp}
                    </Text>
                  )}
                  {/* <Text style={{ ...styles.commentsTime, right: 16 }}>
                    {item.timeStamp}
                  </Text> */}
                </View>
              </View>
            )}
          />
        </View>

        <View style={{ ...styles.form, width: Dimensions.get("window").width }}>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={comment}
              placeholder="Коментувати..."
              placeholderTextColor="rgba(189, 189, 189, 1)"
              onChangeText={onHandleInputComment}
            />
            <TouchableOpacity
              onPress={onMakeComment}
              style={styles.btnSendComment}
            >
              <SvgArrowUp />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

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

  photoWrap: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 32,
  },

  photo: {
    height: 240,
    borderRadius: 8,
  },

  comment: {
    height: 320,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "space-between",
  },

  comments: {
    justifyContent: "space-between",
    marginBottom: 24,
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
  },

  avatarImage: { width: 28, height: 28, borderRadius: 28 },

  //   commentsTextWrap: {
  //     width: 299,
  //     // height: 103,
  //     backgroundColor: "rgba(0, 0, 0, 0.03)",
  //   },

  commentsText: {
    fontFamily: "Roboto-Regular-400",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },

  commentsTime: {
    position: "absolute",
    bottom: 16,
    fontFamily: "Roboto-Regular-400",
    fontSize: 10,
    lineHeight: 13,
    color: "#BDBDBD",
  },

  form: {
    position: "absolute",
    bottom: 16,
    left: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },

  input: {
    height: 50,
    fontFamily: "Roboto-Medium-500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
    borderStyle: "solid",

    paddingLeft: 16,
    paddingRight: 58,
  },

  btnSendComment: {
    position: "absolute",
    top: 8,
    right: 8,

    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 34,

    justifyContent: "center",
    alignItems: "center",
  },
});
