import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bell, ShoppingCart } from "lucide-react-native";
import { useState, useCallback, useEffect } from "react";

import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";

export default function HomeScreen({ setGlobalLoading }) {

  // 🔥 FUNCTION ACAK
  const shuffleArray = (array) => {
    return [...array]
      .map((item) => ({ sort: Math.random(), value: item }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  const [data, setData] = useState([]);

  // 🔥 ACAK SAAT PERTAMA LOAD
  useEffect(() => {
    setData(shuffleArray(products));
  }, []);

  // 🔥 REFRESH TANPA SPINNER
  const onRefresh = useCallback(() => {
    setGlobalLoading(true);

    setTimeout(() => {
      setData(shuffleArray(products)); // 🔥 ACAK LAGI
      setGlobalLoading(false);
    }, 1500);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>

      <SafeAreaView style={styles.container}>

        <StatusBar style="dark" />

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.left}>
            <ShoppingCart size={22} color="#ff6600" />
            <Text style={styles.title}>BelanjaKu</Text>
          </View>

          <View style={styles.iconBox}>
            <Bell size={20} color="black" />
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.paddingHorizontal}>
          <SearchBar />
        </View>

        {/* LIST */}
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}

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

          ListHeaderComponent={
            <View>
              <Text style={styles.section}>Promotions</Text>
              <Banner />

              <Text style={styles.section}>Category List</Text>
              <CategoryList setGlobalLoading={setGlobalLoading} />

              <Text style={styles.section}>Special For You</Text>
            </View>
          }

          renderItem={({ item }) => (
            <ProductCard item={item} />
          )}
        />

      </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },

  paddingHorizontal: {
    paddingHorizontal: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 12,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  iconBox: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 50,
  },

  section: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 12,
  },

  listContent: {
    paddingBottom: 120,
  },

  row: {
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
});