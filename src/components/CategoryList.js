import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const categories = [
  { name: "Shoes", image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg" },
  { name: "Beauty", image: "https://images.pexels.com/photos/8981524/pexels-photo-8981524.jpeg" },
  { name: "Women's\nFashion", image: "https://images.pexels.com/photos/13282702/pexels-photo-13282702.jpeg" },
  { name: "Jewelry", image: "https://images.pexels.com/photos/33154729/pexels-photo-33154729.jpeg" },
  { name: "Men's\nFashion", image: "https://images.pexels.com/photos/18110912/pexels-photo-18110912.jpeg" },
];

export default function CategoryList() {
  return (
    <View style={styles.container}>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent} // 🔥 jarak kiri kanan
      >
        {categories.map((item, index) => (
          <View key={index} style={styles.item}>
            
            <Image source={{ uri: item.image }} style={styles.image} />

            <Text style={styles.text}>
              {item.name}
            </Text>

          </View>
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
    paddingHorizontal: 10, // 🔥 konsisten sama HomeScreen
  },

  item: {
    alignItems: "center",
    marginRight: 18, // 🔥 sedikit lebih lega
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
    maxWidth: 70, // 🔥 biar ga melebar
  },
});