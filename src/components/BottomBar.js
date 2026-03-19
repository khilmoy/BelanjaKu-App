import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Heart, ShoppingCart, User, Home } from "lucide-react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const tabs = [
  { icon: Home, screen: "Home" },
  { icon: Heart, screen: "Wishlist" },
  { icon: ShoppingCart, screen: "Cart" },
  { icon: User, screen: "Profile" },
];

export default function BottomBar({ setGlobalLoading }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  const handlePress = (index, screen) => {
    if (index === activeIndex) return;

    setActiveIndex(index);
    setGlobalLoading(true);

    setTimeout(() => {
      navigation.navigate(screen);

      setTimeout(() => {
        setGlobalLoading(false);
      }, 300);

    }, 700);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <TouchableOpacity
              key={index}
              style={styles.tab}
              onPress={() => handlePress(index, item.screen)}
            >
              <Icon size={22} color={isActive ? "#FF660E" : "#999"} />
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
    height: 65,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderColor: "#ddd",
  },

  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});