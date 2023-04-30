import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import useRoute from "./router";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular-400": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium-500": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold-700": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
  const routing = useRoute(true);

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
      {routing}
    </NavigationContainer>
  );
}