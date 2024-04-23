import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Overlay from "../screens/Overlay";
import Header from "../components/Header";
import Icon from "../components/Icon";
import { View } from "react-native";
import Plant from "../screens/Plant";

export default function TabsNavigator() {
  const { Navigator, Screen } = createBottomTabNavigator();

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: {
      paddingBottom: 8,
      height: 60,
    },
  };

  return (
    <Navigator
      screenOptions={screenOptions}
      sceneContainerStyle={{ backgroundColor: "#fff" }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          header: () => <Header />,
          tabBarActiveTintColor: "#25B755",
          tabBarIcon: ({ color, focused }) => (
            <Icon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Screen
        name="Overlay"
        component={Overlay}
        options={{
          tabBarActiveTintColor: "#25B755",
          tabBarIcon: ({ color, focused }) => (
            <Icon name="grid" color={color} focused={focused} />
          ),
          tabBarStyle: {
            backgroundColor: "rgba(0, 0, 0, 0)",
            position: "absolute",
            borderTopWidth: 0,
            bottom: 0,
            paddingBottom: 8,
            height: 60,
            opacity: 0.72,
          },
        }}
      />
      <Screen
        name="Plant"
        component={Plant}
        options={{
          tabBarItemStyle: {
            display: "none",
          },
          unmountOnBlur: true,
        }}
      />
    </Navigator>
  );
}
