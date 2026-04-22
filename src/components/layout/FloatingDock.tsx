'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';

export function FloatingDock() {
  const { openAuthModal, user } = useAuthStore();
  const { openCart, items } = useCartStore();

  // Hack for search modal trigger since we aren't lifting state easily yet
  const openSearch = () => {
    // If we have a SearchModal component listening to a store, we could trigger it here.
    // For now, this is a visual implementation.
    window.dispatchEvent(new CustomEvent('open-search'));
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-sm flex justify-center pb-[env(safe-area-inset-bottom)] pointer-events-none">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.5 }}
        className="glass-panel rounded-[2rem] px-8 py-5 flex items-center gap-10 pointer-events-auto"
      >
        <Link href="/" className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300">
          <Home strokeWidth={1.5} className="w-5 h-5" />
        </Link>
        <button onClick={openSearch} className="text-white/60 hover:text-[#2E5BFF] hover:scale-110 transition-all duration-300">
          <Search strokeWidth={1.5} className="w-5 h-5" />
        </button>
        <button onClick={openCart} className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300 relative">
          <ShoppingBag strokeWidth={1.5} className="w-5 h-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#2E5BFF] rounded-full shadow-[0_0_10px_rgba(46,91,255,1)]" />
          )}
        </button>
        {user ? (
          <Link href="/profile" className="text-[#2E5BFF] shadow-[0_0_15px_rgba(46,91,255,0.3)] rounded-full hover:scale-110 transition-all duration-300 bg-[#2E5BFF]/10 p-1">
            <User strokeWidth={1.5} className="w-5 h-5" />
          </Link>
        ) : (
          <button onClick={openAuthModal} className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300">
            <User strokeWidth={1.5} className="w-5 h-5" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
