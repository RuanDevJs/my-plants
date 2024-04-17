import { StyleSheet, View } from "react-native";
import {
  Nunito_200ExtraLight,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";

import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./src/routes/tabs.routes";

import { PlantsProvider } from "./src/context/PlantsContext";

import theme from "./src/theme";
import { ThemeProvider } from "styled-components/native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <PlantsProvider>
        <NavigationContainer>
          <View style={styles.container}>
            {/* <Header /> */}
            <TabsNavigator />
          </View>
        </NavigationContainer>
      </PlantsProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
