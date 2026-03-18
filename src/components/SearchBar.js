import { View, TextInput, StyleSheet } from "react-native";
import { Search, SlidersHorizontal } from "lucide-react-native";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      
      {/* Icon kiri */}
      <Search size={18} color="#888" style={styles.leftIcon} />

      {/* Input */}
      <TextInput
        placeholder="Search..."
        placeholderTextColor="#888"
        style={styles.input}
      />

      {/* Garis pemisah */}
      <View style={styles.divider} />

      {/* Icon kanan */}
      <SlidersHorizontal size={18} color="#000" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 15
  },

  input: {
    flex: 1,
    marginLeft: 8,
    color: "#000"
  },

  leftIcon: {
    marginLeft: 5
  },

  divider: {
    width: 1,
    height: 20,
    backgroundColor: "#ccc",
    marginHorizontal: 10
  }
});