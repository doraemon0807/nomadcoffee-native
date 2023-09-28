import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Home from "../screens/Home";
import { darkModeVar } from "../../apollo";
import { useReactiveVar } from "@apollo/client";
import { darkTheme, lightTheme } from "../../styles";
import styled from "styled-components/native";
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";
import ShopDetail from "../screens/ShopDetail";
import CategoryResult from "../screens/CategoryResult";

export type SharedStackParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Login: ILoginForm | undefined;
  CreateAccount: undefined;
  CategoryResult: ICategoryResultProps | undefined;
  ShopDetail: IShopDetailProps | undefined;
};

export interface ILoginForm {
  username: string;
  password: string;
  stateMessage: string;
}

interface ISharedStackNavProps {
  screenName: string;
}

interface ICategoryResultProps {
  categoryId: number;
  categoryName: string;
}

interface IShopDetailProps {
  shopId: number;
}

const Logo = styled.Image`
  max-width: 100%;
  max-height: 40px;
`;

const Stack = createStackNavigator<SharedStackParamList>();

export default function SharedStackNav({ screenName }: ISharedStackNavProps) {
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerTintColor: darkMode ? darkTheme.fontColor : lightTheme.fontColor,
        headerStyle: {
          backgroundColor: darkMode ? darkTheme.bgColor : lightTheme.bgColor,
          shadowColor: darkTheme.grayLight,
        },
        presentation: "transparentModal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => (
              <Logo
                resizeMode="contain"
                source={
                  darkMode
                    ? require("../../assets/logo_dark.png")
                    : require("../../assets/logo_light.png")
                }
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === "Login" ? (
        <Stack.Screen name="Login" component={Login} />
      ) : null}
      {screenName === "Profile" ? (
        <Stack.Screen name="Profile" component={Profile} />
      ) : null}

      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          title: "Create Account",
        }}
      />
      <Stack.Screen name="CategoryResult" component={CategoryResult} />
      <Stack.Screen name="ShopDetail" component={ShopDetail} />
    </Stack.Navigator>
  );
}
