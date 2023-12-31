import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, isLoggedInVar } from "../../apollo";
import { darkTheme, lightTheme } from "../../styles";
import TabIcon from "../components/nav/TabIcon";
import useUser from "../hook/useUser";
import Avatar from "../components/shared/Avatar";
import SharedStackNav from "./SharedStackNav";

export type TabsParamList = {
  TabHome: undefined;
  TabSearch: undefined;
  TabLogin: undefined;
  TabProfile: undefined;
};

const Tabs = createBottomTabNavigator<TabsParamList>();

export default function TabsNav() {
  const darkMode = useReactiveVar(darkModeVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const { data } = useUser();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: darkMode
          ? darkTheme.grayNormal
          : lightTheme.grayNormal,
        tabBarActiveTintColor: darkMode
          ? darkTheme.fontColor
          : lightTheme.fontColor,
        tabBarStyle: {
          backgroundColor: darkMode ? darkTheme.bgColor : lightTheme.bgColor,
          borderTopColor: darkTheme.grayLight,
        },
      }}
    >
      <Tabs.Screen
        name="TabHome"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="home" focused={focused} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabSearch"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="search" focused={focused} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>

      {isLoggedIn ? (
        <Tabs.Screen
          name="TabProfile"
          options={{
            tabBarIcon: ({ focused, color }) =>
              data?.me.profile?.avatarURL ? (
                <Avatar
                  avatarUrl={data.me.profile.avatarURL}
                  size="small"
                  focused={focused}
                />
              ) : (
                <TabIcon iconName="person" focused={focused} color={color} />
              ),
          }}
        >
          {() => <SharedStackNav screenName="Me" />}
        </Tabs.Screen>
      ) : (
        <Tabs.Screen
          name="TabLogin"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon iconName="log-in" focused={focused} color={color} />
            ),
          }}
        >
          {() => <SharedStackNav screenName="Login" />}
        </Tabs.Screen>
      )}
    </Tabs.Navigator>
  );
}
