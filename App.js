import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";

import HomeScreen from "./src/screens/HomeScreen";
import WishlistScreen from "./src/screens/WishlistScreen";

import BottomBar from "./src/components/BottomBar";
import { WishlistProvider } from "./src/context/WishlistContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);

  // 🔥 ANIMATION
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      rotateAnim.setValue(0);

      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [loading]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const rotateReverse = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  return (
    <WishlistProvider>
      <NavigationContainer>

        <SafeAreaView style={{ flex: 1 }}>

          {/* 🔥 SCREEN */}
          <View style={{ flex: 1 }}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: "none",
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Wishlist" component={WishlistScreen} />
            </Stack.Navigator>
          </View>

          {/* 🔥 BOTTOM BAR */}
          <BottomBar setGlobalLoading={setLoading} />

        </SafeAreaView>

        {/* 🔥 MODERN LOADING */}
        <Modal visible={loading} transparent animationType="fade">
          <View style={styles.loadingOverlay}>

            <View style={styles.loaderContainer}>
              
              <Animated.View
                style={[
                  styles.outerRing,
                  { transform: [{ rotate }] },
                ]}
              />

              <Animated.View
                style={[
                  styles.innerRing,
                  { transform: [{ rotate: rotateReverse }] },
                ]}
              />

            </View>

            <Text style={styles.loadingText}>
              BelanjaKu...
            </Text>

          </View>
        </Modal>

      </NavigationContainer>
    </WishlistProvider>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  loaderContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  outerRing: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#FF660E",
    borderTopColor: "transparent",
  },

  innerRing: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#fff",
    borderBottomColor: "transparent",
  },

  loadingText: {
    marginTop: 12,
    color: "#fff",
    fontWeight: "600",
  },
});