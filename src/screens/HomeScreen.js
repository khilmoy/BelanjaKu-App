import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bell, ShoppingCart } from "lucide-react-native";

import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";
import BottomBar from "../components/BottomBar";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>

      <SafeAreaView style={styles.container}>
        
        <StatusBar style="dark" backgroundColor="#F5F5F5" />

        {/* 🔥 HEADER */}
        <View style={styles.header}>

          {/* LEFT */}
          <View style={styles.left}>
            <ShoppingCart size={22} color="#ff6600" />
            <Text style={styles.title}>BelanjaKu</Text>
          </View>

          {/* RIGHT */}
          <View style={styles.iconBox}>
            <Bell size={20} color="black" />
          </View>

        </View>

        {/* 🔍 SEARCH */}
        <View style={styles.paddingHorizontal}>
          <SearchBar />
        </View>

        {/* 🔥 MAIN LIST */}
        <FlatList
          data={products}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}

          contentContainerStyle={{
            paddingBottom: 120,
            paddingHorizontal: 10
          }}

          columnWrapperStyle={{
            justifyContent: "space-between"
          }}

          ListHeaderComponent={
            <>
              <Banner />
              <CategoryList />

              <Text style={styles.section}>
                Special For You
              </Text>
            </>
          }

          renderItem={({ item }) => (
            <ProductCard item={item} />
          )}
        />

      </SafeAreaView>

      {/* 🔥 BOTTOM BAR */}
      <BottomBar />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#F5F5F5"
  },

  paddingHorizontal: {
    paddingHorizontal: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold"
  },

  iconBox: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 50
  },

  section: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 2
  }
});