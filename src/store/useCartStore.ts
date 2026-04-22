// src/store/useCartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  category?: string;
}

interface CartState {
  items: CartItem[];
  selectedShipping: 'pickup' | 'home';
  selectedPayment: 'card' | 'upi' | 'wallet';
  isCartOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setShipping: (mode: 'pickup' | 'home') => void;
  setPayment: (method: 'card' | 'upi' | 'wallet') => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  getCartItemsCount: () => number;
  getCartTotal: () => number;
  seedDummyData: () => void;
}

const DUMMY_ITEMS: CartItem[] = [
  {
    id: 'cart-1',
    product_id: 'p-101',
    title: 'Xiaomi 365 Premium Electric Scooter',
    price: 484.99,
    quantity: 1,
    image: 'https://m.media-amazon.com/images/I/71X8X-LqSFL._AC_SL1500_.jpg',
    category: 'E-Mobility'
  },
  {
    id: 'cart-2',
    product_id: 'p-102',
    title: 'Ninebot ES2 Pro Edition',
    price: 489.99,
    quantity: 3,
    image: 'https://m.media-amazon.com/images/I/61Hjg-H-2AL._AC_SL1500_.jpg',
    category: 'E-Mobility'
  }
];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      selectedShipping: 'pickup',
      selectedPayment: 'card',
      isCartOpen: false,

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      setShipping: (mode) => set({ selectedShipping: mode }),
      setPayment: (method) => set({ selectedPayment: method }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      clearCart: () => set({ items: [] }),

      getCartItemsCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      seedDummyData: () => {
        const { items } = get();
        if (items.length === 0) {
          set({ items: DUMMY_ITEMS });
        }
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
