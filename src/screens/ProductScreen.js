import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import CategoryList from "../components/CategoryList";

export default function ProductScreen({ route, setGlobalLoading }) {
  const navigation = useNavigation();
  const { category } = route.params;

  const filteredProducts = products.filter(
    (item) => item.category === category
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔙 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (setGlobalLoading) setGlobalLoading(true);

            setTimeout(() => {
              navigation.navigate("Home");

              setTimeout(() => {
                if (setGlobalLoading) setGlobalLoading(false);
              }, 300);
            }, 600);
          }}
        >
          <ArrowLeft size={22} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>
          {category.toUpperCase()}
        </Text>
      </View>

      {/* 🔥 CATEGORY LIST (PAKAI LOADING) */}
      <CategoryList setGlobalLoading={setGlobalLoading} />

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          padding: 10,
          paddingBottom: 120,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (
          <ProductCard item={item} />
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});