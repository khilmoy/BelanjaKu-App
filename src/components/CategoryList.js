import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

const categories = [
  {
    name: "Shoes",
    value: "shoes",
    image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg",
  },
  {
    name: "Beauty",
    value: "beauty",
    image: "https://images.pexels.com/photos/8981524/pexels-photo-8981524.jpeg",
  },
  {
    name: "Women's\nFashion",
    value: "women fashion",
    image: "https://images.pexels.com/photos/13282702/pexels-photo-13282702.jpeg",
  },
  {
    name: "Jewelry",
    value: "jewelry",
    image: "https://images.pexels.com/photos/33154729/pexels-photo-33154729.jpeg",
  },
  {
    name: "Men's\nFashion",
    value: "mens fashion",
    image: "https://images.pexels.com/photos/18110912/pexels-photo-18110912.jpeg",
  },
];

export default function CategoryList({ setGlobalLoading }) {
  const navigation = useNavigation();

  // 🔥 REFRESH (GLOBAL LOADING ONLY)
  const onRefresh = useCallback(() => {
    if (setGlobalLoading) setGlobalLoading(true);

    setTimeout(() => {
      if (setGlobalLoading) setGlobalLoading(false);
    }, 1000);
  }, []);

  const handlePress = (value) => {
    if (setGlobalLoading) setGlobalLoading(true);

    setTimeout(() => {
      navigation.navigate("Product", {
        category: value,
      });

      setTimeout(() => {
        if (setGlobalLoading) setGlobalLoading(false);
      }, 300);

    }, 800);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}

        // 🔥 REFRESH TANPA SPINNER
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            colors={["transparent"]}
            tintColor="transparent"
          />
        }
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => handlePress(item.value)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <Text style={styles.text}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },

  scrollContent: {
    paddingHorizontal: 10,
  },

  item: {
    alignItems: "center",
    marginRight: 18,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  text: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: "500",
    textAlign: "center",
    maxWidth: 70,
    color: "#555",
  },
});