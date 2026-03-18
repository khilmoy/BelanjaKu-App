import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";

import HomeScreen from "./src/screens/HomeScreen";
import WishlistScreen from "./src/screens/WishlistScreen";

import Header from "./src/components/Header";
import BottomBar from "./src/components/BottomBar";
import { WishlistProvider } from "./src/context/WishlistContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WishlistProvider>
      <NavigationContainer>

        <View style={{ flex: 1 }}>

          {/* 🔥 HEADER GLOBAL */}
          <Header />

          {/* 🔥 SCREEN */}
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Wishlist" component={WishlistScreen} />
          </Stack.Navigator>

          {/* 🔥 BOTTOM BAR */}
          <BottomBar />

        </View>

      </NavigationContainer>
    </WishlistProvider>
  );
}