import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/Main";

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
    <Provider store={store}>
      <Main />
    </Provider>
  );
}