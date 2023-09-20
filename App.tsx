import { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { StatusBar, useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import client, { isLoggedInVar, tokenVar, cache, darkModeVar } from "./apollo";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import BaseNav from "./src/navigators/BaseNav";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const colorScheme = useColorScheme();
  const darkMode = useReactiveVar(darkModeVar);

  useEffect(() => {
    darkModeVar(colorScheme === "dark" ? true : false);
  }, [darkModeVar]);

  useEffect(() => {
    //prepare all the pre-loads
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        const fontsToLoad = [Ionicons.font];
        const fontPromises = fontsToLoad.map(
          async (font) => await Font.loadAsync(font)
        );

        // Pre-Load images
        const imagesToLoad = [require("./assets/logo.png")];
        const imagePromises = imagesToLoad.map((image) =>
          Asset.loadAsync(image)
        );

        // Restore token from cache, and log in if token exists
        const token = await AsyncStorage.getItem("token");
        if (token) {
          isLoggedInVar(true);
          tokenVar(token);
        }

        // Store cache data
        const persistor = new CachePersistor({
          cache,
          storage: new AsyncStorageWrapper(AsyncStorage),
        });

        await persistor.purge();
        await persistor.restore();

        Promise.all([...fontPromises, ...imagePromises]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (appIsReady) {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <NavigationContainer onReady={onLayoutRootView}>
            <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
            <BaseNav />
          </NavigationContainer>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
