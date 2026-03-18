import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useState, useRef, useEffect } from "react";

const { width } = Dimensions.get("window");

const banners = [
  { id: 1, image: "https://images.pexels.com/photos/20247841/pexels-photo-20247841.jpeg" },
  { id: 2, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg" },
  { id: 3, image: "https://images.pexels.com/photos/19090/pexels-photo.jpg" },
];

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const ITEM_WIDTH = width - 40;
  const SPACING = 20;

  // 🔥 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;

      flatListRef.current?.scrollToOffset({
        offset: nextIndex * (ITEM_WIDTH + SPACING),
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / (ITEM_WIDTH + SPACING)
    );
    setActiveIndex(index);
  };

  return (
    <View style={{ marginVertical: 10 }}>

      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={handleScroll}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item, index }) => (
          <BannerItem item={item} index={index} />
        )}
      />

      {/* DOT */}
      <View style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot
            ]}
          />
        ))}
      </View>

    </View>
  );
}

/* 🔥 ITEM TERPISAH (BIAR GA BUG LOADING) */
function BannerItem({ item, index }) {
  const [loaded, setLoaded] = useState(false);

  const ITEM_WIDTH = width - 35;
  const SPACING = 15;

  return (
    <View
      style={{
        width: ITEM_WIDTH,
        marginRight: SPACING
      }}
    >
      <View style={{ position: "relative" }}>

        {/* 🔥 PLACEHOLDER */}
        {!loaded && <View style={styles.placeholder} />}

        {/* 🔥 IMAGE */}
        <Image
          source={{ uri: item.image }}
          style={[styles.image, { opacity: loaded ? 1 : 0 }]}
          resizeMode="cover"
          onLoad={() => setLoaded(true)}
        />

        <View style={styles.overlay} />

        <Text style={styles.text}>
          Super Sale{"\n"}Discount{"\n"}Up to 50%
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Shop Now</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },

  placeholder: {
    position: "absolute",
    width: "100%",
    height: 180,
    borderRadius: 15,
    backgroundColor: "#e0e0e0" // 🔥 ganti warna sesuai selera
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 15
  },

  text: {
    position: "absolute",
    top: 40,
    left: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },

  button: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#ff6600",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4
  },

  activeDot: {
    backgroundColor: "#000",
    width: 12
  }
});