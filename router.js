import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegistrationScreen from "./Screens/RegistrationScreen";
import PostsScreen from "./Screens/PostsScreen";
import LoginScreen from "./Screens/LoginScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";
import SvgGrid from "./assets/images/Svg/SvgGrid";
import SvgPlus from "./assets/images/Svg/SvgPlus";
import SvgUser from "./assets/images/Svg/SvgUser";
import MyTabBar from "./Screens/MyTabBar";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const MainStack = createStackNavigator();

function Home() {
  return (
    <MainTab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <MainTab.Screen
          options={{ headerShown: false }}
          name="Posts"
          component={PostsScreen}
        />
        <MainTab.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={ProfileScreen}
        />
      </MainTab.Navigator>
  );
}

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="Map"
        component={MapScreen}
      />
    </MainStack.Navigator>
  );
};

export default useRoute;