import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import useRoute from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular-400": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium-500": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold-700": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
  const [user, setUser] = useState(null);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    setUser(user);
    // ...
  } else {
    // User is signed out
    // ...
  }
});

  const routing = useRoute(user);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) return undefined;
  else SplashScreen.hideAsync();
    
  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}