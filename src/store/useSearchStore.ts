import { create } from 'zustand';

// Dummy unified product database for searching
export const ALL_PRODUCTS = [
  { id: '1', product_id: 'prod_a1', title: 'Carbon Mesh Coat', price: 8999, category: 'Apparel', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop' },
  { id: '2', product_id: 'prod_a2', title: 'Monolithic Trousers', price: 4499, category: 'Apparel', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800&auto=format&fit=crop' },
  { id: '3', product_id: 'prod_j1', title: 'Chromium Hoops', price: 2499, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop' },
  { id: '4', product_id: 'prod_j2', title: 'Obsidian Pearl', price: 3499, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1599643478524-fb66fa432dd3?q=80&w=800&auto=format&fit=crop' },
  { id: '5', product_id: 'prod_e1', title: 'Lumina Overcoat', price: 12000, category: 'Ethereal', image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=800&auto=format&fit=crop' },
  { id: '6', product_id: 'prod_a5', title: 'Obsidian Silk Blouse', price: 3499, category: 'Apparel', image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=800&auto=format&fit=crop' },
];

interface SearchState {
  searchQuery: string;
  isSearchOpen: boolean;
  setSearchQuery: (query: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  isSearchOpen: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false, searchQuery: '' }),
}));
