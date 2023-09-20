import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";

export type BaseNavStackParamList = {
  Tabs: undefined;
};

const Stack = createStackNavigator<BaseNavStackParamList>();

export default function BaseNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tabs"
        component={TabsNav}
      />
    </Stack.Navigator>
  );
}
