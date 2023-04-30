import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import SvgPlus from "../assets/images/Svg/SvgPlus";
import SvgGrid from "../assets/images/Svg/SvgGrid";
import SvgUser from "../assets/images/Svg/SvgUser";

const MyTabBar = ({ navigation, state }) => {
  
  const currentRout = state.routes[state.index].name;
  return (
    <View style={{ ...styles.tabBar, width: Dimensions.get("window").width }}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.svgWrap}
        onPress={() => navigation.navigate("Posts")}
      >
        <SvgGrid stroke="rgba(33, 33, 33, 0.8)" />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btn}
        onPress={() => {if (currentRout === "Posts" || currentRout === "CreatePosts")
          navigation.navigate("CreatePosts"); else navigation.navigate("Profile");}}
      >
        {currentRout === "Posts" || currentRout === "CreatePosts" ? (
          <SvgPlus />
        ) : (
          <SvgUser stroke="#FFFFFF" />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.svgWrap}
        onPress={() => {if (currentRout === "Profile") navigation.navigate("CreatePosts"); else navigation.navigate("Profile");}}
      >
        {currentRout === "Profile" ? (
          <SvgPlus stroke="rgba(33, 33, 33, 0.8)" />
        ) : (
          <SvgUser />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MyTabBar;

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
