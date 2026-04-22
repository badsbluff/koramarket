import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  product_id: string;
  title: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => set((state) => ({ items: [...state.items, product] })),
      removeItem: (productId) => set((state) => ({ 
        items: state.items.filter((i) => i.product_id !== productId) 
      })),
      toggleItem: (product) => {
        const inWishlist = get().isInWishlist(product.product_id);
        if (inWishlist) {
          get().removeItem(product.product_id);
        } else {
          get().addItem(product);
        }
      },
      isInWishlist: (productId) => get().items.some((i) => i.product_id === productId),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
