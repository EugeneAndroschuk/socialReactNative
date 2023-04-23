import * as Font from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';

const AuthStack = createStackNavigator();

// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular-400": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
//     "Roboto-Medium-500": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
//     "Roboto-Bold-700": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
//   });
// };

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular-400": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium-500": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold-700": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) return undefined;
  else SplashScreen.hideAsync();
    
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   imageBgd: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "flex-end",
    
//     // marginBottom: 100,
//     // alignItems: 'center',
//   },
// });