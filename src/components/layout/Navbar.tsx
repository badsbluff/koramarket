'use client';

import Link from 'next/link';
import { 
  Search, ShoppingBag, User, Heart, ChevronDown, Menu, Phone, MapPin, 
  Shirt, Sparkles, Smartphone, Home, Coffee, 
  Trophy, Gamepad2, Car, ShoppingCart, Activity, Dog, LayoutGrid,
  ArrowRight
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useSearchStore } from '@/store/useSearchStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { name: 'Fashion', icon: Shirt, color: 'text-indigo-500' },
  { name: 'Beauty', icon: Sparkles, color: 'text-pink-500' },
  { name: 'Electronics', icon: Smartphone, color: 'text-blue-500' },
  { name: 'Home & Living', icon: Home, color: 'text-orange-500' },
  { name: 'Appliances', icon: Coffee, color: 'text-gray-600' },
  { name: 'Sports', icon: Trophy, color: 'text-orange-600' },
  { name: 'Toys & Games', icon: Gamepad2, color: 'text-purple-500' },
  { name: 'Automotive', icon: Car, color: 'text-slate-600' },
  { name: 'Groceries', icon: ShoppingCart, color: 'text-green-600' },
  { name: 'Health', icon: Activity, color: 'text-red-500' },
  { name: 'Pet Supplies', icon: Dog, color: 'text-cyan-600' },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { items } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user } = useAuthStore();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [showToast, setShowToast] = useState(false);
  const [lastCount, setLastCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Show toast when item added to cart
  useEffect(() => {
    if (cartCount > lastCount && lastCount !== 0) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
    setLastCount(cartCount);
  }, [cartCount]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/apparel?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="w-full bg-white sticky top-0 z-[100] shadow-sm">
      {/* 1. Top Micro-Nav */}
      {!isAuthPage && (
        <div className="bg-[#F8F9FA] border-b border-gray-100 py-1.5 hidden md:block">
          <div className="max-w-[1400px] mx-auto px-4 flex justify-between items-center text-[11px] text-gray-500 font-bold uppercase tracking-wide">
             <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer transition-colors">
                  <Phone className="w-3 h-3" /> +1 (800) 123 4567
                </span>
                <div className="w-px h-3 bg-gray-200" />
                <span className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer transition-colors">
                  <MapPin className="w-3 h-3" /> Store Locator
                </span>
             </div>
             <div className="flex items-center gap-8">
                <Link href="#" className="hover:text-purple-600 transition-colors">Sell on Kora</Link>
                <Link href="#" className="hover:text-purple-600 transition-colors">Track Your Order</Link>
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900 transition-colors">
                   $ USD <ChevronDown className="w-3 h-3" />
                </div>
             </div>
          </div>
        </div>
      )}

      {/* 2. Promo Banner */}
      {!isAuthPage && (
        <div className="bg-[#fdf2ff] py-2 px-4 border-b border-purple-50 hidden md:flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span className="text-[11px] md:text-[12px] font-bold text-gray-700 text-center">
             Big Spring Sale is Live! <span className="text-purple-600 ml-1">Up to 60% OFF</span>
          </span>
          <div className="hidden sm:block w-px h-3 bg-purple-200" />
          <Link href="/apparel" className="text-[11px] md:text-[12px] font-black text-purple-600 hover:underline flex items-center gap-1">
             Shop Now <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* 3. Main Header */}
      <div className={`py-2 md:py-5 bg-white border-b border-gray-50 md:border-none ${isAuthPage ? 'lg:border-b' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 w-full flex flex-col md:flex-row md:items-center gap-2 md:gap-6 overflow-visible">
          
          {/* Logo & Mobile Actions */}
          <div className="flex items-center justify-between w-full md:w-auto shrink-0 py-1">
            <Link href="/" className="text-xl md:text-3xl lg:text-4xl font-black tracking-tighter shrink-0 flex items-center">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">KORA</span>
            </Link>
            
            <div className="flex items-center gap-2 md:hidden">
               {!isAuthPage && (
                 <button 
                   onClick={() => setIsSearchOpen(!isSearchOpen)}
                   className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                 >
                   <Search className="w-5 h-5" />
                 </button>
               )}
               <Link href="/wishlist" className="relative group p-2">
                 <Heart className="w-5 h-5 text-gray-700" />
                 {wishlistItems.length > 0 && (
                   <span className="absolute top-1 right-1 bg-pink-500 text-white text-[8px] h-3.5 w-3.5 rounded-full flex items-center justify-center font-bold border-2 border-white">{wishlistItems.length}</span>
                 )}
               </Link>
               <Link href="/cart" className="relative group p-2">
                 <ShoppingBag className="w-5 h-5 text-gray-700" />
                 {cartCount > 0 && (
                   <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[8px] h-3.5 w-3.5 rounded-full flex items-center justify-center font-bold border-2 border-white">{cartCount}</span>
                 )}
               </Link>
               <Link href={user ? "/profile" : "/login"} className="p-2">
                 <User className="w-5 h-5 text-gray-700" />
               </Link>
            </div>
          </div>

          {/* All Categories Dropdown (Desktop Only) */}
          {!isAuthPage && (
            <Link href="/apparel" className="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg cursor-pointer border border-gray-100 hover:bg-gray-50 transition-colors text-gray-700 font-black text-[13px] shrink-0">
               <Menu className="w-4 h-4 text-gray-400" />
               <span>All Categories</span>
               <ChevronDown className="w-4 h-4 opacity-30 ml-1" />
            </Link>
          )}

          {/* Search Bar (Mobile Toggleable) */}
          {!isAuthPage && (
            <AnimatePresence>
              {(isSearchOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
                <motion.form 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  onSubmit={handleSearch} 
                  className={`w-full md:flex-1 flex items-center h-[46px] md:h-[52px] bg-gray-100/80 hover:bg-gray-100 rounded-full px-1.5 border border-transparent focus-within:border-indigo-200 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(99,102,241,0.08)] transition-all duration-300 ${!isSearchOpen ? 'hidden md:flex' : 'flex'}`}
                >
                  <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 ml-4 shrink-0 transition-colors group-focus-within:text-indigo-500" />
                  <input 
                    type="text"
                    placeholder="Search for anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 min-w-0 px-3 md:px-4 text-[13px] md:text-[14px] outline-none bg-transparent placeholder:text-gray-400 font-semibold text-gray-800"
                  />
                  <button type="submit" className="bg-[#1A1A2E] text-white h-[36px] md:h-[42px] px-5 md:px-7 rounded-full flex items-center justify-center gap-2 hover:bg-indigo-600 hover:shadow-lg transition-all shrink-0 active:scale-95 shadow-sm">
                    <span className="font-extrabold text-[12px] md:text-[13px] tracking-wide">Search</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          )}

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center gap-6 ml-auto shrink-0">
            {/* ... (Account/Wishlist/Cart - no change needed here but keeping the structure) */}
            {/* Account */}
            {user ? (
              <Link href="/profile" className="flex items-center gap-2.5 group text-left">
                <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center">
                  <User className="w-4.5 h-4.5 text-indigo-600" />
                </div>
                <div className="hidden lg:block leading-tight">
                  <p className="text-[10px] text-gray-400 font-bold leading-none mb-0.5">Welcome</p>
                  <p className="text-[13px] font-black text-gray-800 leading-none">{user.name.split(' ')[0]}</p>
                </div>
              </Link>
            ) : (
              <Link href="/login" className="flex items-center gap-2.5 group text-left">
                <div className="w-9 h-9 rounded-full bg-gray-50 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
                  <User className="w-4.5 h-4.5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
                </div>
                <div className="hidden lg:block leading-tight">
                  <p className="text-[10px] text-gray-400 font-bold leading-none mb-0.5">Hello, Sign In</p>
                  <p className="text-[13px] font-black text-gray-800 leading-none">My Account</p>
                </div>
              </Link>
            )}

            {/* Wishlist — live count from store */}
            <Link href="/wishlist" className="flex items-center gap-2.5 group relative">
              <div className="relative">
                <Heart className="w-5 h-5 text-gray-700 group-hover:text-rose-500 transition-colors" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[9px] h-4 w-4 rounded-full flex items-center justify-center font-bold border border-white">
                    {wishlistItems.length > 9 ? '9+' : wishlistItems.length}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-[13px] font-black text-gray-800">Wishlist</span>
            </Link>

            {/* Cart — live count from store */}
            <Link href="/cart" className="flex items-center gap-2.5 group relative">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-indigo-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[9px] h-4 w-4 rounded-full flex items-center justify-center font-bold border border-white">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block leading-tight">
                <p className="text-[10px] text-gray-400 font-bold mb-0.5 leading-none uppercase">Cart</p>
                <p className="text-[13px] font-black text-gray-800 leading-none">
                  ${cartTotal.toLocaleString()}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Sub-Navigation (Horizontal Scroll Fixed) */}
      {!isAuthPage && (
        <nav className="border-t border-gray-100 bg-white overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex items-center gap-6 md:gap-8 py-2 md:py-3 overflow-x-auto no-scrollbar scroll-smooth">
               {CATEGORIES.map((cat) => (
                 <Link 
                   key={cat.name} 
                   href={`/apparel?category=${encodeURIComponent(cat.name)}`}
                   className="flex items-center gap-2 group whitespace-nowrap shrink-0 py-1"
                 >
                   <cat.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${cat.color}`} />
                   <span className="text-[11px] md:text-[12px] font-black text-gray-600 group-hover:text-gray-900 transition-colors uppercase tracking-tight">{cat.name}</span>
                 </Link>
               ))}
               <Link href="/apparel" className="ml-auto flex items-center gap-1.5 text-[11px] md:text-[12px] font-black text-gray-500 hover:text-gray-900 shrink-0 border-l border-gray-100 pl-6 md:pl-8 py-1">
                  <Menu className="w-3.5 h-3.5" /> More
               </Link>
            </div>
          </div>
        </nav>
      )}

      {/* "Item Added" Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="fixed bottom-8 left-1/2 bg-gray-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl z-[200] font-bold text-sm flex items-center gap-3"
          >
            <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-[10px]">✓</span>
            Added to cart!
            <Link href="/cart" className="text-indigo-400 underline ml-1">View Cart →</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
