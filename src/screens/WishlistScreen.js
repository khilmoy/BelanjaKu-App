import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { useContext, useCallback } from "react";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function WishlistScreen({ setGlobalLoading }) {
  const { wishlist } = useContext(WishlistContext);

  // 🔥 REFRESH (CUMA GLOBAL LOADING)
  const onRefresh = useCallback(() => {
    setGlobalLoading(true);

    setTimeout(() => {
      setGlobalLoading(false);
    }, 1000);
  }, []);

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
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}

          // 🔥 REFRESH TANPA SPINNER
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={onRefresh}
              colors={["transparent"]}
              tintColor="transparent"
            />
          }

          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}

          renderItem={({ item }) => (
            <ProductCard item={item} />
          )}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#F5F5F5"
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 12
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  emptyText: {
    fontSize: 16,
    color: "#8c8b8b",
    textAlign: "center"
  },

  listContent: {
    paddingBottom: 100,
  },

  row: {
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
});