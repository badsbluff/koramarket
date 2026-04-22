import { create } from 'zustand';

export interface Product {
  id: string;
  product_id: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
  rating: number;
  ratingCount: number;
  brand: string;
}

export const ALL_PRODUCTS: Product[] = [
  // --- Electronics / Mobiles ---
  {
    id: '1',
    product_id: 'iphone-15-pro',
    title: 'iPhone 15 Pro, 128GB, Titanium Black',
    price: 82500,
    originalPrice: 99900,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    ratingCount: 12300,
    brand: 'Apple',
  },
  {
    id: '2',
    product_id: 'samsung-s24-ultra',
    title: 'Samsung Galaxy S24 Ultra, 256GB, Titanium Gray',
    price: 104999,
    originalPrice: 129999,
    discount: 19,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    rating: 4.9,
    ratingCount: 8400,
    brand: 'Samsung',
  },
  {
    id: '3',
    product_id: 'google-pixel-8',
    title: 'Google Pixel 8 Pro, 128GB, Obsidian',
    price: 69999,
    originalPrice: 79999,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1610945415295-d9baf060e871?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    rating: 4.7,
    ratingCount: 3200,
    brand: 'Google',
  },

  // --- Laptops / Computers ---
  {
    id: '4',
    product_id: 'macbook-air-m2',
    title: 'MacBook Air M2, 256GB SSD, Space Gray',
    price: 92000,
    originalPrice: 108000,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    rating: 4.9,
    ratingCount: 8400,
    brand: 'Apple',
  },
  {
    id: '5',
    product_id: 'dell-xps-13',
    title: 'Dell XPS 13 Laptop, Intel i7, 16GB RAM',
    price: 115000,
    originalPrice: 135000,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    rating: 4.6,
    ratingCount: 1500,
    brand: 'Dell',
  },

  // --- Audio ---
  {
    id: '6',
    product_id: 'sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    price: 24900,
    originalPrice: 32900,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    ratingCount: 5200,
    brand: 'Sony',
  },
  {
    id: '7',
    product_id: 'airpods-pro-2',
    title: 'Apple AirPods Pro 2 (2nd Generation)',
    price: 19900,
    originalPrice: 24900,
    discount: 21,
    image: 'https://images.unsplash.com/photo-1588423770574-010325134c6d?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    ratingCount: 9800,
    brand: 'Apple',
  },

  // --- Fashion / Men's ---
  {
    id: '8',
    product_id: 'nike-air-max',
    title: "Nike Air Max 270 Men's Running Shoes",
    price: 12999,
    originalPrice: 15999,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    category: 'Fashion',
    rating: 4.7,
    ratingCount: 4500,
    brand: 'Nike',
  },
  {
    id: '9',
    product_id: 'levis-511-slim',
    title: "Levi's Men's 511 Slim Fit Jeans",
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop',
    category: 'Fashion',
    rating: 4.5,
    ratingCount: 2200,
    brand: "Levi's",
  },
  {
    id: '10',
    product_id: 'adidas-hoodie',
    title: 'Adidas Essential Trefoil Hoodie',
    price: 4999,
    originalPrice: 6999,
    discount: 28,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    category: 'Fashion',
    rating: 4.6,
    ratingCount: 1800,
    brand: 'Adidas',
  },

  // --- Fashion / Women's ---
  {
    id: '11',
    product_id: 'zara-floral-dress',
    title: 'Zara Floral Print Midi Dress',
    price: 3290,
    originalPrice: 4590,
    discount: 28,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format&fit=crop',
    category: 'Fashion',
    rating: 4.4,
    ratingCount: 950,
    brand: 'Zara',
  },
  {
    id: '12',
    product_id: 'luxury-handbag',
    title: 'Premium Leather Crossbody Handbag',
    price: 18450,
    originalPrice: 24500,
    discount: 24,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
    category: 'Fashion',
    rating: 4.8,
    ratingCount: 1100,
    brand: 'Kora Luxe',
  },

  // --- Home & Living ---
  {
    id: '13',
    product_id: 'modern-sofa',
    title: 'Modern 3-Seater Velvet Sofa, Emerald Green',
    price: 42900,
    originalPrice: 59900,
    discount: 28,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop',
    category: 'Home & Living',
    rating: 4.9,
    ratingCount: 640,
    brand: 'Kora Home',
  },
  {
    id: '14',
    product_id: 'ceramic-planter',
    title: 'Handcrafted Ceramic Planter with Gold Stand',
    price: 2490,
    originalPrice: 3500,
    discount: 28,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&auto=format&fit=crop',
    category: 'Home & Living',
    rating: 4.7,
    ratingCount: 1200,
    brand: 'Kora Home',
  },
  {
    id: '15',
    product_id: 'scented-candle',
    title: 'Luxury Scented Candle, Lavender & Sea Salt',
    price: 1200,
    originalPrice: 1800,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop',
    category: 'Home & Living',
    rating: 4.8,
    ratingCount: 850,
    brand: 'Kora Home',
  },

  // --- Beauty ---
  {
    id: '16',
    product_id: 'la-mer-cream',
    title: 'La Mer Crème de la Mer Moisturizer, 60ml',
    price: 28500,
    originalPrice: 32000,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=600&auto=format&fit=crop',
    category: 'Beauty',
    rating: 4.9,
    ratingCount: 2100,
    brand: 'La Mer',
  },
  {
    id: '17',
    product_id: 'dior-lipstick',
    title: 'Dior Rouge Lipstick, Classic Red 999',
    price: 3400,
    originalPrice: 4200,
    discount: 19,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=600&auto=format&fit=crop',
    category: 'Beauty',
    rating: 4.7,
    ratingCount: 3400,
    brand: 'Dior',
  },

  // --- Appliances ---
  {
    id: '18',
    product_id: 'nespresso-vertuo',
    title: 'Nespresso Vertuo Coffee Machine',
    price: 15990,
    originalPrice: 19990,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1510551310160-589462daf284?q=80&w=600&auto=format&fit=crop',
    category: 'Appliances',
    rating: 4.8,
    ratingCount: 1450,
    brand: 'Nespresso',
  },
  {
    id: '19',
    product_id: 'dyson-v15',
    title: 'Dyson V15 Detect Cordless Vacuum',
    price: 52900,
    originalPrice: 64900,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=600&auto=format&fit=crop',
    category: 'Appliances',
    rating: 4.9,
    ratingCount: 1500,
    brand: 'Dyson',
  },

  // --- Sports & Health ---
  {
    id: '20',
    product_id: 'yoga-mat',
    title: 'Premium Non-Slip Yoga Mat, 6mm',
    price: 1490,
    originalPrice: 2200,
    discount: 32,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    category: 'Sports',
    rating: 4.6,
    ratingCount: 1200,
    brand: 'Kora Sports',
  },
  {
    id: '21',
    product_id: 'dumbbells-set',
    title: 'Adjustable Dumbbell Set, 20kg',
    price: 5499,
    originalPrice: 7999,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop',
    category: 'Sports',
    rating: 4.7,
    ratingCount: 850,
    brand: 'Kora Sports',
  },

  // --- Automotive ---
  {
    id: '22',
    product_id: 'car-dash-cam',
    title: '4K Dash Cam with Night Vision & WiFi',
    price: 7990,
    originalPrice: 12990,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop',
    category: 'Automotive',
    rating: 4.5,
    ratingCount: 1100,
    brand: 'SecureDrive',
  },

  // --- Groceries ---
  {
    id: '23',
    product_id: 'honey-raw',
    title: 'Organic Raw Wild Forest Honey, 500g',
    price: 450,
    originalPrice: 600,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=600&auto=format&fit=crop',
    category: 'Groceries',
    rating: 4.8,
    ratingCount: 4200,
    brand: 'Kora Fresh',
  },
  {
    id: '24',
    product_id: 'almonds-california',
    title: 'Premium California Almonds, 1kg',
    price: 890,
    originalPrice: 1200,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1508029060042-5819df1b8380?q=80&w=600&auto=format&fit=crop',
    category: 'Groceries',
    rating: 4.7,
    ratingCount: 5600,
    brand: 'Kora Fresh',
  },

  // --- Toys & Games ---
  {
    id: '25',
    product_id: 'lego-spaceshuttle',
    title: 'LEGO Discovery Space Shuttle Expedition',
    price: 15490,
    originalPrice: 18990,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=600&auto=format&fit=crop',
    category: 'Toys & Games',
    rating: 4.9,
    ratingCount: 2200,
    brand: 'LEGO',
  },

  // --- Health ---
  {
    id: '26',
    product_id: 'whey-protein',
    title: 'Optimum Nutrition Gold Standard Whey, 2kg',
    price: 6499,
    originalPrice: 7999,
    discount: 19,
    image: 'https://images.unsplash.com/photo-1593095117711-1370b546ee53?q=80&w=600&auto=format&fit=crop',
    category: 'Health',
    rating: 4.8,
    ratingCount: 15400,
    brand: 'ON',
  },

  // --- Pet Supplies ---
  {
    id: '27',
    product_id: 'royal-canin-dog',
    title: 'Royal Canin Adult Golden Retriever Food, 12kg',
    price: 7200,
    originalPrice: 8500,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=600&auto=format&fit=crop',
    category: 'Pet Supplies',
    rating: 4.7,
    ratingCount: 3200,
    brand: 'Royal Canin',
  }
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
