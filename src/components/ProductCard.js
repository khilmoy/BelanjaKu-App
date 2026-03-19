import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Heart } from "lucide-react-native";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

export default function ProductCard({ item }) {

  const { wishlist, toggleLike } = useContext(WishlistContext);

  const liked = wishlist.some(i => i.id === item.id);

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
  };

  return (
    <View style={styles.container}>

      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <TouchableOpacity
        style={styles.heart}
        onPress={() => toggleLike(item)}
      >
        <Heart
          size={18}
          color={liked ? "#ff3b30" : "#fff"}
          fill={liked ? "#ff3b30" : "none"}
        />
      </TouchableOpacity>

      <View style={styles.overlay}>
        <Text numberOfLines={1} style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.price}>
          ${item.price}
        </Text>

        <View style={styles.row}>
          <Text style={styles.rating}>
            ⭐ {item.rating}
          </Text>

          <Text style={styles.sold}>
            {formatNumber(item.sold)} sold
          </Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%", // 🔥 INI KUNCI BIAR 2 KOLOM
    marginBottom: 12,
    height: 200,
    borderRadius: 18,
    overflow: "hidden",
    elevation: 5,
    backgroundColor: "#000",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 6,
    borderRadius: 20,
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  name: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },

  price: {
    color: "#ff6600",
    marginTop: 3,
    fontWeight: "bold",
    fontSize: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },

  rating: {
    color: "#ffd700",
    fontSize: 11,
  },

  sold: {
    color: "#ccc",
    fontSize: 11,
  },
});