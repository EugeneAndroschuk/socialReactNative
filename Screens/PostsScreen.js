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
import { useState, useEffect } from "react";

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
   
    if (route.params) setPosts((prev) => [...prev, route.params])
    
  }, [route.params]);

  const onOpenMap = (coords) => {
    navigation.navigate("Map", { coords });
  };

  const onOpenComments = () => {
    navigation.navigate("Comments");
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Публікації</Text>
        <SvgLogOut style={styles.svgLogOut} />
      </View>

      <View style={styles.posts}>
        <View style={styles.user}>
          <View style={styles.userPhoto}></View>
          <View style={styles.userTitle}>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userEmail}>email@example.com</Text>
          </View>
        </View>
      </View>

      <View style={styles.form}>
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <View style={styles.photoWrap}>
                <Image
                  source={{ uri: item.currentPhoto }}
                  style={styles.photo}
                />
              </View>
              <Text style={styles.photoTitle}>{item.formData.photoTitle}</Text>

              <View style={styles.data}>
                <View style={styles.feedback}>
                  <SvgComment
                    onPress={onOpenComments}
                    style={{ marginRight: 9 }}
                  />
                  <Text style={{ marginRight: 27 }}>8</Text>
                </View>

                <View style={styles.location}>
                  <SvgMapPin
                    onPress={() => onOpenMap(item.coords)}
                    style={{ marginRight: 8 }}
                  />
                  <Text>{item.formData.photoLocation}</Text>
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
    // borderBottomColor: "#000000",
    // elevation: 2,
    //   shadowColor: "#000000",
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
    height: 480,
    marginHorizontal: 16,
    marginTop: 32,
  },

  post: {
    // marginTop: 35,
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
