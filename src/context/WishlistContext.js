import { createContext, useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const toggleLike = (item) => {
    const exist = wishlist.find((i) => i.id === item.id);

    if (exist) {
      setWishlist(wishlist.filter((i) => i.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleLike }}>
      {children}
    </WishlistContext.Provider>
  );
}