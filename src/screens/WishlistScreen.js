import { View, Text, FlatList, StyleSheet } from "react-native";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function WishlistScreen() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Wishlist</Text>

      {wishlist.length === 0 ? (
        // 🔥 EMPTY STATE
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            💔 Belum ada wishlist{"\n"}
            Yuk tambahkan produk favoritmu!
          </Text>
        </View>
      ) : (
        // 🔥 LIST PRODUK
        <FlatList
          data={wishlist}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F5F5"
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  emptyText: {
    fontSize: 18,
    color: "#8c8b8b",
    textAlign: "center"
  }
});