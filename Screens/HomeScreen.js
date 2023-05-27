import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTabBar from "./MyTabBar";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

const HomeScreen = () => {
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
};

export default HomeScreen;
