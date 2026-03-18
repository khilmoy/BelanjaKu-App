import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Grid, Heart, ShoppingCart, User, Home } from "lucide-react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native"; // 🔥 TAMBAH INI

const tabs = [
  { id: 0, icon: Home, screen: "Home" },
  { id: 1, icon: Heart, screen: "Wishlist" }, // 🔥 HEART KE WISHLIST
  { id: 2, icon: ShoppingCart, screen: "Cart" },
  { id: 3, icon: User, screen: "Profile" },
];

export default function BottomBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [positions, setPositions] = useState([]);

  const navigation = useNavigation(); // 🔥 INI PENTING

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>

        {/* 🔥 BULATAN */}
        {positions[activeIndex] && (
          <View
            style={[
              styles.activeIndicator,
              {
                left:
                  positions[activeIndex].x +
                  positions[activeIndex].width / 2 -
                  20,
              },
            ]}
          />
        )}

        {tabs.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <TouchableOpacity
              key={index}
              style={styles.tab}
              onPress={() => {
                setActiveIndex(index);

                // 🔥 NAVIGATION DISINI
                if (item.screen) {
                  navigation.navigate(item.screen);
                }
              }}
              onLayout={(e) => {
                const layout = e.nativeEvent.layout;
                setPositions((prev) => {
                  const newPos = [...prev];
                  newPos[index] = layout;
                  return newPos;
                });
              }}
            >
              <Icon size={22} color={isActive ? "#fff" : "#999"} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  activeIndicator: {
    position: "absolute",
    top: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff6600",
  },
});