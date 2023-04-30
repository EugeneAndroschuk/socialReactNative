import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import SvgLogOut from "../assets/images/Svg/SvgLogOut";

const PostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Публикации</Text>
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

      <Text onPress={() => navigation.navigate("Comments")}>GO TO COMMENTS</Text>
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
      flexDirection: 'row',
  },

    userTitle: {
        justifyContent: 'center',
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

  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,

    flexDirection: "row",

    paddingTop: 9,
    paddingBottom: 34,

    justifyContent: "center",

    borderStyle: "solid",
    borderTopWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.3)",
  },

  svgWrap: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  btn: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 31,
    marginRight: 31,
  },
});
