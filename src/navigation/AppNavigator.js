import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import WishlistScreen from "../screens/WishlistScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator({ setGlobalLoading }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {/* HOME */}
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen {...props} setGlobalLoading={setGlobalLoading} />
          )}
        </Stack.Screen>

        {/* WISHLIST */}
        <Stack.Screen name="Wishlist">
          {(props) => (
            <WishlistScreen {...props} setGlobalLoading={setGlobalLoading} />
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}